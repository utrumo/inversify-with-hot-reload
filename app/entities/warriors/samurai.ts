import { inject, injectable } from 'inversify';
import { ServiceIdentifier } from 'app/constants/constants';
import type { IWarrior, IWeapon } from 'app/types/types';

@injectable()
export class Samurai implements IWarrior {
  public readonly name = 'Samurai';

  public constructor(@inject(ServiceIdentifier.Weapon.SHURIKEN) public readonly weapon: IWeapon) {}
}
