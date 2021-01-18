import {AnimalEntity} from "@/entity/animal-entity";

export class RoundEntity{
    // 下注信息
    betInfo?: Map<string, number>;
    // 打中的动物
    resultInfo? : AnimalEntity;
    // 结算信息，用户赢了还是输了多少
    setInfo?: number;
}
