import { Container } from 'inversify';
import { hotRequire } from 'app/helpers/helpers';

const createContainer = (): Container => {
  const container = new Container();
  hotRequire<typeof import('./app-modules.config')>('./app-modules.config', (module) =>
    module.bindModules(container),
  );
  return container;
};

export { createContainer };
