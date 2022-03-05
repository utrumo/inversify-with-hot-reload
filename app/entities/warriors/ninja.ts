import { inject, injectable } from 'inversify';
import { ServiceIdentifier } from 'app/constants/constants';
import type { IWarrior, IWeapon } from 'app/types/types';

@injectable()
export class Ninja implements IWarrior {
  public readonly name = 'Ninja';

  public constructor(@inject(ServiceIdentifier.Weapon.KATANA) public readonly weapon: IWeapon) {}
}
