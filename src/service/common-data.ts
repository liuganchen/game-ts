import {AnimalEntity} from '@/entity/animal-entity';

/**
 * 游戏界面所有动物的集合
 * 从上方中间开始
 *      猴子 猴子 猴子 兔子 兔子 兔子 鲨鱼 燕子 燕子 燕子 鸽子 鸽子 鸽子 通杀
 * 通赔 熊猫 熊猫 熊猫 狮子 狮子 狮子 鲨鱼 老鹰 老鹰 老鹰 孔雀 孔雀 孔雀
 * 倍率如下：经典 6 8 8 12倍率
 * 鲨鱼：24
 * 老鹰：12
 * 狮子：12
 * 猴子：8
 * 孔雀：8
 * 熊猫：8
 * 鸽子：8
 * 兔子：6
 * 燕子：6
 * 走兽：2
 * 飞禽：2
 */

export const animalBgList: AnimalEntity[] = [
  {name: '鲨鱼', line: 24,},
  {name: '燕子', line: 24,},
  {name: '燕子', line: 24,},
  {name: '燕子', line: 24,},
  {name: '鸽子', line: 24,},
  {name: '鸽子', line: 24,},
  {name: '鸽子', line: 24},
  {name: '通杀', line: 0},
  {name: '孔雀', line: 8},
  {name: '孔雀', line: 8},
  {name: '孔雀', line: 8},
  {name: '老鹰', line: 12,},
  {name: '老鹰', line: 12,},
  {name: '老鹰', line: 12,},
  {name: '鲨鱼', line: 24,},
  {name: '狮子', line: 12,},
  {name: '狮子',line: 12,},
  {name: '狮子', line: 12,},
  {name: '熊猫', line: 8,},
  {name: '熊猫', line: 8,},
  {name: '熊猫', line: 8,},
  {name: '通赔', line: 0,},
  {name: '猴子', line: 6,},
  {name: '猴子', line: 6,},
  {name: '猴子', line: 6,},
  {name: '兔子', line: 6,},
  {name: '兔子', line: 6,},
  {name: '兔子', line: 6,},
];

export const siteList = [
  [(990 - 91) / 2, 0],
  [(990 - 91) / 2  +  70 + 2 + 2, 4 ],
  [(990 - 91) / 2  +  140 + 10, 14 ],
  [(990 - 91) / 2  +  210 + 12, 31 ],
  [(990 - 91) / 2  +  210 + 12 + 70, 54],
  [(990 - 91) / 2  +  210 + 12 + 70 + 65, 54 + 30 + 8 - 3 ],
  [(990 - 91) / 2  +  210 + 12 + 70 + 65 + 53, 54 + 30 + 8 - 3 + 24 + 28 + 2],
  [(990 - 91) / 2  +  210 + 12 + 70 + 65 + 53 + 40 - 13 - 2 - 2 - 2 +1, 54 + 30 + 8 - 3 + 24 + 28 + 2 + 23 + 40 + 3 + 3 + 2 - 1],

];
// 游戏配置信息
export const gameStaticConfig = {
  startTime: 8,
  freeTime: 5,
  betTime:5,
  turns: 4
}
// 消息key 值
export const gameRoundInfoKey = Symbol('游戏当前回合信息');
export const evasiveIsOver = Symbol('当前轮转动画已经结束');
