import { inject, injectable } from 'inversify';
import { ServiceIdentifier } from 'app/constants/constants';
import type { IBattle, IWarrior } from 'app/types/types';

@injectable()
export class EpicBattle implements IBattle {
  constructor(
    @inject(ServiceIdentifier.Warrior.NINJA) private readonly _warrior1: IWarrior,
    @inject(ServiceIdentifier.Warrior.SAMURAI) private readonly _warrior2: IWarrior,
  ) {}

  public fight() {
    const desc = `FIGHT!
        ${this._warrior1.name} (${this._warrior1.weapon.name})
        vs
        ${this._warrior2.name} (${this._warrior2.weapon.name})`;
    return desc;
  }
}
