import {AnimalEntity} from "@/entity/animal-entity";

export class RoundEntity{
    // 当前时间：startTime freeTime betTime
    timeType: 'startTime' | 'freeTime' | 'betTime' = 'startTime';
    // 单位 秒
    time =  20;
    nextType(){
        this.timeType = this.timeType === 'startTime' ? 'freeTime' : this.timeType === 'freeTime' ? 'betTime' : 'startTime';
    }
    // 打中的动物
    resultInfo? : AnimalEntity;
}
export class RoundEntityWithBet extends RoundEntity{
    // 下注信息
    betInfo?: Map<string, number>;
    // 打中的动物
    resultInfo? : AnimalEntity;
    // 结算信息，用户赢了还是输了多少
    setInfo?: number;
}
