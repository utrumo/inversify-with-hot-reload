import { injectable } from 'inversify';
import { IWeapon } from 'app/types/types';

@injectable()
export class Shuriken implements IWeapon {
  public readonly name = 'Shuriken';
}
