import { inject, injectable } from 'inversify';
import { hotRequire } from 'app/helpers/helpers';
import type { IWarrior, IWeapon } from 'app/types/types';

const hotId = hotRequire<typeof import('app/constants/service-id')>('app/constants/service-id');

@injectable()
export class Ninja implements IWarrior {
  public readonly name = 'Ninja';

  public constructor(@inject(hotId.m.WeaponId.KATANA) public readonly weapon: IWeapon) {}
}
