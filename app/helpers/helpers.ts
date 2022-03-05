import { interfaces } from 'inversify';
import { HotRequire } from './hotRequire';

const hotRequireInstance = new HotRequire(!process.env.PRODUCTION);

/* eslint-disable @typescript-eslint/unbound-method */
export const hotRequire = hotRequireInstance.require;

export const forceBind = <T>(
  container: interfaces.Container,
  identifier: interfaces.ServiceIdentifier<T>,
): interfaces.BindingToSyntax<T> =>
  container.isBound(identifier) ? container.rebind<T>(identifier) : container.bind<T>(identifier);
