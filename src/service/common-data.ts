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
 * 下注9  获取（6 ~ 24）
 * 下注一百次, 鲨鱼打中a次，老鹰b次，狮子c次，猴子d次，孔雀e次。熊猫f。鸽子g 兔子 h 燕子 i
 * 900 约等于 24a + 12b + 12c + 8d + 8e + 8f + 8g + 6h + 6i ;
 * 100 ====  a + b + c + d +   e  + f + g + h + i;
 * 100 ====  4 + 8 + 8 + 12 + 12 + 12 + 12 + 16 + 16
 *  1 - 100
 */
export const animalChance = [
  {
    name: '鲨鱼',
    chanceMin: 1,
    chanceMax: 4,
  },{
    name: '老鹰',
    chanceMin: 5,
    chanceMax: 12,
  },{
    name: '狮子',
    chanceMin: 13,
    chanceMax: 20,
  },{
    name: '猴子',
    chanceMin: 21,
    chanceMax: 32,
  },{
    name: '孔雀',
    chanceMin: 33,
    chanceMax: 44,
  },{
    name: '熊猫',
    chanceMin: 45,
    chanceMax: 56,
  },{
    name: '鸽子',
    chanceMin: 57,
    chanceMax: 68,
  },{
    name: '兔子',
    chanceMin: 69,
    chanceMax: 84,
  },{
    name: '燕子',
    chanceMin: 85,
    chanceMax: 100,
  },
]

export const animalBgList: AnimalEntity[] = [
  {name: '鲨鱼', line: 24, lineType: 'sy', shortName: 'sy'},
  {name: '燕子', line: 6, lineType: 'fq', shortName: 'yz'},
  {name: '燕子', line: 6, lineType: 'fq', shortName: 'yz'},
  {name: '燕子', line: 6, lineType: 'fq', shortName: 'yz'},
  {name: '鸽子', line: 8, lineType: 'fq', shortName: 'gz'},
  {name: '鸽子', line: 8, lineType: 'fq', shortName: 'gz'},
  {name: '鸽子', line: 8, lineType: 'fq', shortName: 'gz'},
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
  startTime: 5,
  freeTime: 4,
  betTime:15,
  turns: 4,
  fsFlag: 500000,
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
