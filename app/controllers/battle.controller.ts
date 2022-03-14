import { inject, injectable } from 'inversify';
import { hotRequire } from 'app/helpers/helpers';
import type { IBattle, IBattleController } from 'app/types/types';

const hotId = hotRequire<typeof import('app/constants/service-id')>('app/constants/service-id');

@injectable()
export class BattleController implements IBattleController {
  constructor(@inject(hotId.m.BattleId.EPIC_BATTLE) private readonly _battle: IBattle) {}

  fight() {
    return this._battle.fight();
  }
}
