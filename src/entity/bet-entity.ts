export class BetEntity{
    animalName!: string;
    betNum = 0;
}
const betMap: Map<string, number> = new Map<string, number>();
betMap.set('走兽', 0);
betMap.set('飞禽', 0);
betMap.set('燕子', 0);
betMap.set('鸽子', 0);
betMap.set('孔雀', 0);
betMap.set('老鹰', 0);
betMap.set('鲨鱼', 0);
betMap.set('狮子', 0);
betMap.set('熊猫', 0);
betMap.set('猴子', 0);
betMap.set('兔子', 0);
const oddsMap: Map<string, number> = new Map<string, number>();
oddsMap.set('走兽', 2);
oddsMap.set('飞禽', 2);
oddsMap.set('燕子', 6);
oddsMap.set('鸽子', 8);
oddsMap.set('孔雀', 8);
oddsMap.set('老鹰', 12);
oddsMap.set('鲨鱼', 24);
oddsMap.set('狮子', 12);
oddsMap.set('熊猫', 8);
oddsMap.set('猴子', 8);
oddsMap.set('兔子', 6);
export const initBetMap = betMap;
export const initOddsMap = oddsMap;

