import { inject, injectable } from 'inversify';
import { hotRequire } from 'app/helpers/helpers';
import type { IKoaRouter, IKoaRouterModule, IRouter } from 'app/types/types';

const hotId = hotRequire<typeof import('app/constants/service-id')>('app/constants/service-id');

@injectable()
export class RootRouter implements IRouter {
  public readonly router: IKoaRouter;

  constructor(
    @inject(hotId.m.ModuleId.KOA_ROUTER) routerModule: IKoaRouterModule,
    @inject(hotId.m.RouterId.BATTLE_ROUTER) battleRouter: IRouter,
  ) {
    const Router = routerModule.default;
    this.router = new Router();
    this.router.use('/battle', battleRouter.router.routes());
  }
}
