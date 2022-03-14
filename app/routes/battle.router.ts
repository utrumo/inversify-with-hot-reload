import { inject, injectable } from 'inversify';
import { hotRequire } from 'app/helpers/helpers';
import type { IBattleController, IKoaRouter, IKoaRouterModule, IRouter } from 'app/types/types';

const hotId = hotRequire<typeof import('app/constants/service-id')>('app/constants/service-id');

@injectable()
export class BattleRouter implements IRouter {
  public readonly router: IKoaRouter;

  constructor(
    @inject(hotId.m.ModuleId.KOA_ROUTER) routerModule: IKoaRouterModule,
    @inject(hotId.m.ControllerId.BATTLE_CONTROLLER) battleController: IBattleController,
  ) {
    const Router = routerModule.default;
    this.router = new Router();
    this.router.get('/fight', (ctx) => {
      ctx.body = battleController.fight();
    });
  }
}
