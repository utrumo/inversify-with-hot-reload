import path from 'path';
import chokidar from 'chokidar';

type IRequestedModule = unknown;
type IModuleContainer<T extends IRequestedModule> = { m: T };
type IOnLoadModule<T extends IRequestedModule> = (module: T) => void;
type ICbRecord = {
  cbOwner: string;
  onLoadModule: IOnLoadModule<IRequestedModule>;
};

export class HotRequire {
  protected static getCallsites(): NodeJS.CallSite[] {
    const backup = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, callSites) => callSites;
    const callSites = new Error().stack as unknown as NodeJS.CallSite[];
    Error.prepareStackTrace = backup;
    return callSites;
  }

  protected static getCallerFileName(): string {
    const callerFileName = this.getCallsites()
      .find((it) => it.getFileName() !== __filename)
      ?.getFileName();
    if (!callerFileName) throw new Error('not found callerFileName');
    return callerFileName;
  }

  protected static getAbsolutePath(modulePath: string): string {
    try {
      const absolutePath = require.resolve(modulePath);
      return absolutePath;
    } catch (_e) {
      const callerFileName = this.getCallerFileName();
      const callerDir = path.dirname(callerFileName);
      const resolvedPath = path.resolve(callerDir, modulePath);
      const absolutePath = require.resolve(resolvedPath);
      return absolutePath;
    }
  }

  protected readonly _ModulePathModuleContainer: Record<
    string,
    IModuleContainer<IRequestedModule>
  > = {};

  protected readonly _ModulePathWatcher: Record<string, chokidar.FSWatcher> = {};

  protected readonly _ModulePathCbRecords: Record<string, ICbRecord[]> = {};

  public constructor(protected readonly _watch: boolean) {
    this.require = this.require.bind(this);
    console.log(`HotRequire hmr: ${this._watch ? 'enabled' : 'disabled'}`);
  }

  protected unloadModule(absolutePath: string) {
    Object.values(this._ModulePathCbRecords).forEach((cbRecords) => {
      for (let i = cbRecords.length - 1; i >= 0; i--) {
        const cbRecord = cbRecords[i];
        if (cbRecord.cbOwner === absolutePath) cbRecords.splice(i, 1);
      }
    });
    delete require.cache[absolutePath];
  }

  protected loadModule(absolutePath: string, isAdd: boolean): IModuleContainer<IRequestedModule> {
    this.unloadModule(absolutePath);

    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    const requestedModule: IRequestedModule = require(absolutePath);

    if (!this._ModulePathModuleContainer[absolutePath])
      this._ModulePathModuleContainer[absolutePath] = { m: requestedModule };
    else this._ModulePathModuleContainer[absolutePath].m = requestedModule;

    if (isAdd) console.log(`Module successfull loaded: ${absolutePath}`);
    else console.log(`Module successfull reloaded: ${absolutePath}`);

    return this._ModulePathModuleContainer[absolutePath];
  }

  protected stopWatching(absolutePath: string): void {
    this._ModulePathWatcher[absolutePath]?.close().catch(console.error);
    delete this._ModulePathWatcher[absolutePath];
  }

  protected watchChanges(absolutePath: string): void {
    this.stopWatching(absolutePath);

    const watcher = chokidar.watch(absolutePath, { ignoreInitial: true, awaitWriteFinish: true });
    const cbRecords = this._ModulePathCbRecords[absolutePath];

    watcher.on('add', (modulePath) => {
      const moduleContainer = this.loadModule(modulePath, true);
      this.watchChanges(absolutePath);
      cbRecords?.forEach((it) => it.onLoadModule(moduleContainer.m));
    });

    watcher.on('change', (modulePath) => {
      const moduleContainer = this.loadModule(modulePath, false);
      this.watchChanges(absolutePath);
      cbRecords?.forEach((it) => it.onLoadModule(moduleContainer.m));
    });

    watcher.on('unlink', (modulePath) => {
      console.log(
        `Module deleted, using cached version of module until new version appears: ${modulePath}`,
      );
    });

    this._ModulePathWatcher[absolutePath] = watcher;
  }

  protected addOnLoadCb(absolutePath: string, onLoadModule: IOnLoadModule<IRequestedModule>): void {
    const constructor = this.constructor as typeof HotRequire;
    const cbOwner = constructor.getCallerFileName();

    if (!this._ModulePathCbRecords[absolutePath]) this._ModulePathCbRecords[absolutePath] = [];
    const cbRecords = this._ModulePathCbRecords[absolutePath];

    if (!cbRecords.find((it) => it.cbOwner === cbOwner && it.onLoadModule === onLoadModule))
      cbRecords.push({ cbOwner, onLoadModule });
  }

  public require<T extends IRequestedModule>(
    modulePath: string,
    onLoadModule?: IOnLoadModule<T>,
  ): IModuleContainer<T> {
    const constructor = this.constructor as typeof HotRequire;
    const absolutePath = constructor.getAbsolutePath(modulePath);

    let moduleContainer = this._ModulePathModuleContainer[absolutePath];
    if (!moduleContainer) moduleContainer = this.loadModule(absolutePath, true);

    if (this._watch) {
      if (onLoadModule)
        this.addOnLoadCb(absolutePath, onLoadModule as IOnLoadModule<IRequestedModule>);

      this.watchChanges(absolutePath);
    }

    if (onLoadModule) onLoadModule(moduleContainer.m as T);

    return moduleContainer as IModuleContainer<T>;
  }
}
