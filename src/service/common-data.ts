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
  {name: '鲨鱼', line: 24, lineType: 'sy', shortName: 'sy'},
  {name: '燕子', line: 24, lineType: 'fq', shortName: 'yz'},
  {name: '燕子', line: 24, lineType: 'fq', shortName: 'yz'},
  {name: '燕子', line: 24, lineType: 'fq', shortName: 'yz'},
  {name: '鸽子', line: 24, lineType: 'fq', shortName: 'gz'},
  {name: '鸽子', line: 24, lineType: 'fq', shortName: 'gz'},
  {name: '鸽子', line: 24, lineType: 'fq', shortName: 'gz'},
  {name: '通杀', line: 0, lineType: 'kt', shortName: 'ts'},
  {name: '孔雀', line: 8, lineType: 'fq', shortName: 'kq'},
  {name: '孔雀', line: 8, lineType: 'fq', shortName: 'kq'},
  {name: '孔雀', line: 8, lineType: 'fq', shortName: 'kq'},
  {name: '老鹰', line: 12, lineType: 'fq', shortName: 'ly'},
  {name: '老鹰', line: 12, lineType: 'fq', shortName: 'ly'},
  {name: '老鹰', line: 12, lineType: 'fq', shortName: 'ly'},
  {name: '鲨鱼', line: 24, lineType: 'sy', shortName: 'sy'},
  {name: '狮子', line: 12, lineType: 'zs', shortName: 'sz'},
  {name: '狮子',line: 12,lineType: 'zs', shortName: 'sz'},
  {name: '狮子', line: 12,lineType: 'zs', shortName: 'sz'},
  {name: '熊猫', line: 8,lineType: 'zs', shortName: 'xm'},
  {name: '熊猫', line: 8,lineType: 'zs', shortName: 'xm'},
  {name: '熊猫', line: 8,lineType: 'zs', shortName: 'xm'},
  {name: '通赔', line: 0, lineType: 'gi', shortName: 'tp'},
  {name: '猴子', line: 6,lineType: 'zs', shortName: 'hz'},
  {name: '猴子', line: 6,lineType: 'zs', shortName: 'hz'},
  {name: '猴子', line: 6,lineType: 'zs', shortName: 'hz'},
  {name: '兔子', line: 6,lineType: 'zs', shortName: 'tz'},
  {name: '兔子', line: 6,lineType: 'zs', shortName: 'tz'},
  {name: '兔子', line: 6,lineType: 'zs', shortName: 'tz'},
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
  betTime:20,
  turns: 4,
  defaultTotalAssets: 1000000
}
// 消息key 值
export const gameRoundInfoKey = Symbol('游戏当前回合信息');
export const evasiveIsOver = Symbol('当前轮转动画已经结束');
export const betIsOver = Symbol('下注结束');
export const freeIsOver = Symbol('空闲结束');

// ui 摆放位置
export const betAnimalUiInit = [
  {index: 1, jx: 'yz'},
  {index: 2, jx: 'gz'},
  {index: 3, jx: 'kq'},
  {index: 4, jx: 'ly'},
  {index: 11, jx: 'sy'},
  {index: 5, jx: 'sz'},
  {index: 6, jx: 'xm'},
  {index: 7, jx: 'hz'},
  {index: 8, jx: 'tz'},
]
