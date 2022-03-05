import type { interfaces } from 'inversify';
import { forceBind, hotRequire } from 'app/helpers/helpers';
import type { IBattle, IWarrior, IWeapon } from 'app/types/types';

const hotConstants =
  hotRequire<typeof import('app/constants/constants')>('app/constants/constants');

export const bindModules = (container: interfaces.Container) => {
  const { ServiceIdentifier } = hotConstants.module;

  hotRequire<typeof import('app/entities/warriors/ninja')>(
    'app/entities/warriors/ninja',
    (module) => forceBind<IWarrior>(container, ServiceIdentifier.Warrior.NINJA).to(module.Ninja),
  );
  hotRequire<typeof import('app/entities/warriors/samurai')>(
    'app/entities/warriors/samurai',
    (module) =>
      forceBind<IWarrior>(container, ServiceIdentifier.Warrior.SAMURAI).to(module.Samurai),
  );
  hotRequire<typeof import('app/entities/weapons/shuriken')>(
    'app/entities/weapons/shuriken',
    (module) =>
      forceBind<IWeapon>(container, ServiceIdentifier.Weapon.SHURIKEN).to(module.Shuriken),
  );
  hotRequire<typeof import('app/entities/weapons/katana')>(
    'app/entities/weapons/katana',
    (module) => forceBind<IWeapon>(container, ServiceIdentifier.Weapon.KATANA).to(module.Katana),
  );
  hotRequire<typeof import('app/entities/EpicBattle/EpicBattle')>(
    'app/entities/EpicBattle/EpicBattle',
    (module) =>
      forceBind<IBattle>(container, ServiceIdentifier.Battle.EPIC_BATTLE).to(module.EpicBattle),
  );
};
