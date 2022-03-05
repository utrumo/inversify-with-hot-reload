import { injectable } from 'inversify';
import { IWeapon } from 'app/types/types';

@injectable()
export class Katana implements IWeapon {
  public readonly name = 'Katana';
}
