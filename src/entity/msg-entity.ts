export class  MsgEntity<T>{
    type!: symbol; // 必须是唯一的
    data!: T;
}
