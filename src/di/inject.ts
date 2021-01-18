import Container from './container';// 使用 id 定义模块后，需要使用 id 来注入模块
export function Inject(id?: string): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    const Dependency = Reflect.getMetadata('design:type', target, propertyKey);
    const _id = id || Reflect.getMetadata('cus:id', Dependency);
    const _dependency = Container.get(_id);
    console.log('Inject 注入器执行', _dependency, target, propertyKey)
    // 给属性注入依赖
    const res = Reflect.defineProperty(target, propertyKey, {
      value: _dependency,
    });
    console.log(res, '注入的结果');
  };
}
