import Container from './container';
interface ConstructableFunction extends Function {
  new (): any;
}
export function Service(): Function {

  return (target: ConstructableFunction) => {
    const id =  Symbol(target.name);
    Reflect.defineMetadata('customer', id, target);
    const singleInstance = new target();
    Container.set(id, singleInstance);
  };
}
