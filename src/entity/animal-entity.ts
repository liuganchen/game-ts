export class Site{
  x!: number;
  y!: number;
}
export class AnimalEntity {
  // 唯一id
  id?: number | symbol;
  /**
   * 动物的名称
   */
  name!: string;
  // odds 赔率 这个数值乘以下注的彩金 = 总彩金
  line!: number;
  //
  rect?: Site;
  site?: number[];
  index?: number;
  // 被激活
  active?: boolean;
}
