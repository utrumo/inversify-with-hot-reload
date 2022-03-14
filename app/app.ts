import 'tsconfig-paths/register';
import 'reflect-metadata';
import { hotRequire } from 'app/helpers/helpers';
import { IKoaModule, IRouter, IRouterContext } from 'app/types/types';

const hotContainer = hotRequire<typeof import('app/config/main-container.config')>(
  'app/config/main-container.config',
);
const hotId = hotRequire<typeof import('app/constants/service-id')>('app/constants/service-id');

const bootstrap = (port: number): void => {
  const container = hotContainer.m.createContainer();
  const Koa = container.get<IKoaModule>(hotId.m.ModuleId.KOA).default;

  new Koa()
    .use((ctx: IRouterContext, next) => {
      const rootRouter = container.get<IRouter>(hotId.m.RouterId.ROOT_ROUTER);
      rootRouter.router.routes()(ctx, next);
    })
    .listen(port, () => console.log(`Server running on http://localhost:${port}`));
};

bootstrap(3000);
