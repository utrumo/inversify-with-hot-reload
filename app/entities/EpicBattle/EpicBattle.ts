import { inject, injectable } from 'inversify';
import { hotRequire } from 'app/helpers/helpers';
import type { IBattle, IWarrior } from 'app/types/types';

const hotId = hotRequire<typeof import('app/constants/service-id')>('app/constants/service-id');

@injectable()
export class EpicBattle implements IBattle {
  constructor(
    @inject(hotId.m.WarriorId.NINJA) private readonly _warrior1: IWarrior,
    @inject(hotId.m.WarriorId.SAMURAI) private readonly _warrior2: IWarrior,
  ) {}

  public fight() {
    const desc = `FIGHT!
        ${this._warrior1.name} (${this._warrior1.weapon.name})
        vs
        ${this._warrior2.name} (${this._warrior2.weapon.name})`;
    return desc;
  }
}
