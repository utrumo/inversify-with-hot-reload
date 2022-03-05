import 'tsconfig-paths/register';
import 'reflect-metadata';
import Koa from 'koa';
import { hotRequire } from 'app/helpers/helpers';
import type { IBattle } from 'app/types/types';

const hotMainContainer = hotRequire<typeof import('app/config/main-container.config')>(
  'app/config/main-container.config',
);
const hotConstants =
  hotRequire<typeof import('app/constants/constants')>('app/constants/constants');

const app = new Koa();
const container = hotMainContainer.module.createContainer();

app.use((ctx) => {
  const { ServiceIdentifier } = hotConstants.module;
  const epicBattle = container.get<IBattle>(ServiceIdentifier.Battle.EPIC_BATTLE);
  const message = epicBattle.fight();
  console.log(message);
  ctx.body = message;
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
