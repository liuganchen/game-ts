import Container from './container';// 使用 id 定义模块后，需要使用 id 来注入模块
export function Inject(id?: string | symbol): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const Dependency = Reflect.getMetadata('design:type', target, propertyKey);
    const _id = id || Reflect.getMetadata('customer', Dependency);
    if(!Container.has(_id)){
      Container.set(_id, new Dependency());
    }
    const _dependency = Container.get(_id);
    // 给属性注入依赖
    Reflect.defineProperty(target, propertyKey, {
      value: _dependency,
    });
  };
}
