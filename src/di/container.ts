/**
 * ContainerMap 用来存储注册的模块，set 和 get 用来注册和读取模块，has 用来判断模块是否已经注册。
 * set 形参 id 表示模块 id， value 表示模块。
 * get 用于返回指定模块 id 对应的模块。
 * has 用于判断模块是否注册。
 */
export class Container {
  private ContainerMap = new Map<string | symbol, any>();

  public set = (id: string | symbol, value: any): void => {
    this.ContainerMap.set(id, value);
  }

  public get = <T extends any>(id: string | symbol): T => {
    return this.ContainerMap.get(id) as T;
  }

  public has = (id: string | symbol): boolean => {
    return this.ContainerMap.has(id);
  }}
const ContainerInstance = new Container();
export default ContainerInstance;
