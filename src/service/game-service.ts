import {AnimalEntity} from '@/entity/animal-entity';
import {Service} from '@/di/service';
import {animalBgList, gameStaticConfig, siteList} from '@/service/common-data';
import {Subject} from "rxjs";
import {MsgEntity} from "@/entity/msg-entity";
import {BetEntity, betKeyType, initBetEntity, initBetMap} from "@/entity/bet-entity";
import {RoundEntity, RoundEntityWithBet} from "@/entity/round-entity";

/**
 * 服务：用户获取游戏过程中所需要的相关信息 【单例 = true】
 *
 * 具体存储的数据
 *    1，用户信息：金币，下注
 *    2，系统信息：总奖池，回合数量及结果（历史信息记录）
 *    3，当前回合信息：目标结果储存 ----- 这个信息就需要延时获取。
 */
@Service(true)
export class GameService {
  // 信息push中间件
  private msgSub = new Subject<MsgEntity>();
  public msgObs = this.msgSub.asObservable();
  // 用户信息 需要实时更新1，金币信息
  public userTotalAssetsNum = gameStaticConfig.defaultTotalAssets;
  // 2，得分信息 , 只算赢
  public userScoreNum = 0;
  // 3，下注信息，历史下注信息
  private betMap: Map<string, betKeyType> = initBetMap;
  private betEntity: BetEntity = initBetEntity;
  // 系统信息 1，总奖池信息
  public jackpotInfo = 0;
  // 2，游戏回合历史信息
  public roundHisInfo: RoundEntityWithBet[] = [];
  // 3，当前回合信息 可以自行修改
  public nowRoundInfo: RoundEntity = new RoundEntity();
  // 4, 常量：动物数组
  private animalListCommonData: AnimalEntity[] = [];
  /**
   * 推送游戏消息
   * @param msg
   */
  public pushMsg(msg: MsgEntity) {
    this.msgSub.next(msg);
  }

  /**
   * 获取动物数组的静态数据，用于bg光标的使用
   * 动物的摆放是中心对称的，获取到右上侧的坐标，即可计算拿到所有的坐标位置
   */
  public getAnimalListCommonData(): AnimalEntity[] {
    if(this.animalListCommonData.length > 0){
      return this.animalListCommonData;
    }
    const sites = siteList;
    this.animalListCommonData = animalBgList.map((animal, index) => {
      animal.site = [0,0];
      // 从鲨鱼开始 一直到最后侧的动物，一共八个。鲨鱼 - 猴子 * 3 - 兔子 * 3 - 通杀
      if (index < 8) {
        animal.site = sites[index];
      }
      // 从第 9个开始 到 第 9 + 6 = 15 个 与 sites 水平对称，
      // 第 9个 的位置 为 第 7 个的 位置 x 相同 ，y 加上 （第八个的Y - 第 7  个的Y 的差值）
      // 8 -- 6
      // 9 -- 5
      if (index >= 8 && index <= 14) {
        // 对称位置的index
        const symmetricIndex = 14 - index;
        animal.site = [sites[symmetricIndex][0], sites[7][1] * 2 -  sites[symmetricIndex][1]];
      }
      // 16个开始到21 与 1 到 8  中心对称
      if (index >= 15 && index <= 20) {
        // 计算中心点，用两个鲨鱼的坐标即可
        const firstSharkSite = sites[0];
        const secSharkSite = [sites[0][0], sites[7][1] * 2 -  sites[0][1]];
        const centerSite = [(firstSharkSite[0] + secSharkSite[0]) / 2, (firstSharkSite[1] + secSharkSite[1]) / 2];
        // 15 - 1
        // 16 - 2
        const sIndex = index - 14;
        animal.site = [2 * centerSite[0] - sites[sIndex][0],  2 * centerSite[1] - sites[sIndex][1]];
      }
      // 21 - 27  与 1 - 8 垂直对称
      if (index >= 21 && index <= 27) {
        const sIndex = 28 - index;
        animal.site = [2 * sites[0][0] - sites[sIndex][0] , sites[sIndex][1]];
      }
      animal.id = Symbol(`${animal.name}---${index}`);
      animal.index = index;
      animal.rect = {x: animal.site[0], y: animal.site[1]};
      return animal;
    });
    return this.animalListCommonData;
  }

  /**
   * 获取本回合的目标动物
   */
  public getResultAnimalInfo(): AnimalEntity {
    // 根据历史结果计算偏移量
    // 根据奖池计算概率偏移
    // 根据动物赔率计算基数
    // 综合以上三者，计算目标动物
    return this.animalListCommonData[GameService.randomNumForNTOM(this.animalListCommonData.length - 1, 0)];
  }

  /**
   * 获取本回合结果
   * @param round
   */
  public getBetInfo(round?: RoundEntity): RoundEntityWithBet {
    if(round){
      this.nowRoundInfo  = round;
    }
    // 下注的信息
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const betName = this.betMap.get(this.nowRoundInfo.resultInfo?.name!)!;
    const betNum = this.betEntity[betName];
    const odds = this.nowRoundInfo.resultInfo?.line;
    const roundEntityWithBet = new RoundEntityWithBet();
    roundEntityWithBet.resultInfo = this.nowRoundInfo.resultInfo;
    roundEntityWithBet.betInfo = this.betEntity;
    let setInfo = 0;
    if(this.nowRoundInfo.resultInfo?.lineType === 'gi') {
      // 如果是统赔
      setInfo = this.betEntity.getGeneralIndemnityNumber();
    }
    if(this.nowRoundInfo.resultInfo?.lineType === 'kt') {
      // 通杀
      setInfo = 0;
    }
    if(this.nowRoundInfo.resultInfo?.lineType !== 'kt' && this.nowRoundInfo.resultInfo?.lineType !== 'gi'){
      setInfo = Number(betNum) * Number(odds);
      // 计算飞禽走兽 奖励
      if(this.nowRoundInfo.resultInfo?.lineType === 'fq'){
        setInfo += this.betEntity.fq * 2;
      }
      // 计算飞禽走兽 奖励
      if(this.nowRoundInfo.resultInfo?.lineType === 'zs'){
        setInfo += this.betEntity.zs * 2;
      }
    }

    roundEntityWithBet.setInfo = setInfo;
    // 更新得分信息
    this.userScoreNum += roundEntityWithBet.setInfo;
    // 更新总分信息
    this.userTotalAssetsNum += roundEntityWithBet.setInfo;
    // 更新奖池
    this.jackpotInfo = this.jackpotInfo + this.betEntity.total() - roundEntityWithBet.setInfo;
    // 结果存入历史
    this.roundHisInfo.push(roundEntityWithBet);
    return roundEntityWithBet;
  }

  updateBetEntityKeyValue(betKey: betKeyType, value: number) {
    this.betEntity[betKey] = value;
  }
  updateBetEntity(ent: BetEntity) {
    this.betEntity = ent;
  }


  // ////////////////////////////////////////////////////////////////////////////
  // // set get 方法区域 /////////////////////////////////////////////////////////
  // public getUserTotalAssetsNum(): number {
  //   return this._userTotalAssetsNum;
  // }
  // public setUserTotalAssetsNum(totalAssetsNum: number): void {
  //   this._userTotalAssetsNum = totalAssetsNum;
  // }
  // public getUserScoreNum(): number {
  //   return this._userScoreNum;
  // }
  // public setUserScoreNum(value: number) {
  //   this._userScoreNum = value;
  // }

  public static randomNumForNTOM(m: number , n: number): number {
    return Math.floor(Math.random()*(m-n+1)+n)
  }
}
