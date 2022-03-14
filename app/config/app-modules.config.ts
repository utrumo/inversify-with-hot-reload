import * as RouterModule from '@koa/router';
import type { interfaces } from 'inversify';
import * as KoaModule from 'koa';
import { bindOnce, forceBind, hotRequire } from 'app/helpers/helpers';
import type {
  IBattle,
  IBattleController,
  IKoaModule,
  IKoaRouterModule,
  IRouter,
  IWarrior,
  IWeapon,
} from 'app/types/types';

const hotId = hotRequire<typeof import('app/constants/service-id')>('app/constants/service-id');

export const bindModules = (container: interfaces.Container) => {
  const { ModuleId, WarriorId, WeaponId, BattleId, ControllerId, RouterId } = hotId.m;

  /** modules */
  bindOnce<IKoaModule>(container, ModuleId.KOA)?.toConstantValue(KoaModule);
  bindOnce<IKoaRouterModule>(container, ModuleId.KOA_ROUTER)?.toConstantValue(RouterModule);

  /** entities */
  hotRequire<typeof import('app/entities/warriors/ninja')>(
    'app/entities/warriors/ninja',
    (module) => forceBind<IWarrior>(container, WarriorId.NINJA).to(module.Ninja),
  );
  hotRequire<typeof import('app/entities/warriors/samurai')>(
    'app/entities/warriors/samurai',
    (module) => forceBind<IWarrior>(container, WarriorId.SAMURAI).to(module.Samurai),
  );
  hotRequire<typeof import('app/entities/weapons/shuriken')>(
    'app/entities/weapons/shuriken',
    (module) => forceBind<IWeapon>(container, WeaponId.SHURIKEN).to(module.Shuriken),
  );
  hotRequire<typeof import('app/entities/weapons/katana')>(
    'app/entities/weapons/katana',
    (module) => forceBind<IWeapon>(container, WeaponId.KATANA).to(module.Katana),
  );
  hotRequire<typeof import('app/entities/EpicBattle/EpicBattle')>(
    'app/entities/EpicBattle/EpicBattle',
    (module) => forceBind<IBattle>(container, BattleId.EPIC_BATTLE).to(module.EpicBattle),
  );

  /** Controllers */
  hotRequire<typeof import('app/controllers/battle.controller')>(
    'app/controllers/battle.controller',
    (module) =>
      forceBind<IBattleController>(container, ControllerId.BATTLE_CONTROLLER).to(
        module.BattleController,
      ),
  );

  /** Routes */
  hotRequire<typeof import('app/routes/battle.router')>('app/routes/battle.router', (module) =>
    forceBind<IRouter>(container, RouterId.BATTLE_ROUTER).to(module.BattleRouter),
  );
  hotRequire<typeof import('app/routes/root.router')>('app/routes/root.router', (module) =>
    forceBind<IRouter>(container, RouterId.ROOT_ROUTER).to(module.RootRouter),
  );
};
