import type Router from '@koa/router';
import type * as RouterModule from '@koa/router'; // eslint-disable-line import/no-duplicates
import type { RouterContext } from '@koa/router'; // eslint-disable-line import/no-duplicates
import type * as KoaModule from 'koa';

export * from './weapon';
export * from './warrior';
export * from './battle';

export type IKoaRouter = Router;
export type IRouterContext = RouterContext;

export type IKoaModule = typeof KoaModule;
export type IKoaRouterModule = typeof RouterModule;

export type IRouter = {
  router: IKoaRouter;
};

export type IBattleController = {
  fight: () => string;
};
