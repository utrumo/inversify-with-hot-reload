import { inject, injectable } from 'inversify';
import { hotRequire } from 'app/helpers/helpers';
import type { IWarrior, IWeapon } from 'app/types/types';

const hotId = hotRequire<typeof import('app/constants/service-id')>('app/constants/service-id');

@injectable()
export class Samurai implements IWarrior {
  public readonly name = 'Samurai';

  public constructor(@inject(hotId.m.WeaponId.SHURIKEN) public readonly weapon: IWeapon) {}
}
