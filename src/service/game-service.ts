import {AnimalEntity} from '@/entity/animal-entity';
import {Service} from '@/di/service';
import {animalBgList, animalChance, gameStaticConfig, siteList} from '@/service/common-data';
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
@Service()
export class GameService {
  // 信息push中间件
  private msgSub = new Subject<MsgEntity>();
  // 用户信息 需要实时更新1，金币信息
  private userTotalAssetsNum = gameStaticConfig.defaultTotalAssets;
  // 2，得分信息 , 只算赢
  private userScoreNum = 0;
  // 3，下注信息，历史下注信息
  private betMap: Map<string, betKeyType> = initBetMap;
  private betEntity: BetEntity = initBetEntity;
  // 系统信息 1，总奖池信息
  private jackpotInfo = 0;
  // 2，游戏回合历史信息
  private roundHisInfo: RoundEntityWithBet[] = [];
  // 3，当前回合信息 可以自行修改
  private nowRoundInfo: RoundEntity = new RoundEntity();
  // 4, 常量：动物数组
  private animalListCommonData: AnimalEntity[] = [];
  /** 对外暴露消息OBS **/
  public msgObs = this.msgSub.asObservable();

  /** 产生 n ~ m 的随机数 */
  public static randomNumForNTOM(m: number , n: number): number {
    return Math.floor(Math.random()*(m-n+1)+n)
  }

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
   * 根据奖池判断 5% 概率 给 通杀/通赔偿
   * 根据赔率计算概率
   */
  public getResultAnimalInfo(): AnimalEntity {
    // 根据历史结果计算偏移量 todo
    // 根据奖池计算概率偏移
    const rand100f = GameService.randomNumForNTOM(10 , 1)
    if(rand100f === 1) {
      if(this.jackpotInfo > gameStaticConfig.fsFlag) {
        // 奖池已经大于放水的金额了，通陪安排上
        return this.animalListCommonData.filter(item => item.shortName === 'tp')[0];
      }
      // 继续通杀
      return this.animalListCommonData.filter(item => item.shortName === 'ts')[0];
    }
    // 根据动物赔率计算基数
    const rand100s = GameService.randomNumForNTOM(100 , 1)
    const chanceAnimal = animalChance.filter(ani => ani.chanceMin <= rand100s && rand100s <= ani.chanceMax)[0];
    const resAniList = this.animalListCommonData.filter(ani => ani.name === chanceAnimal.name);
    // 综合以上三者，计算目标动物
    console.log('计算结果：', rand100s);
    return resAniList[GameService.randomNumForNTOM(resAniList.length - 1, 0)];
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
    // 去掉下注的分数
    this.userScoreNum -= this.betEntity.total();
    // 更新总分信息
    this.userTotalAssetsNum += roundEntityWithBet.setInfo;
    // 更新奖池
    const jack = this.betEntity.total() - roundEntityWithBet.setInfo;
    console.log('当前的本回合彩金----', jack, this.betEntity , roundEntityWithBet);
    this.jackpotInfo = Math.ceil(this.jackpotInfo + jack * (jack > 0 ? 0.95 : 1.05));
    console.log('当前的彩金----', this.jackpotInfo);
    // 结果存入历史
    this.roundHisInfo.push(roundEntityWithBet);
    return roundEntityWithBet;
  }

  /**** 获取历史动物列表 ***/
  public getHistoryAnimals(): RoundEntityWithBet[] {
    return this.roundHisInfo.map(item => item);
  }

  /** 获取当前回合结果分数 **/
  public getResScore(): number {
    const roundHisInfo = this.getHistoryAnimals();
    const lastRoundInfo = roundHisInfo[roundHisInfo.length - 1];
    return lastRoundInfo?.setInfo || 0;
  }

  /** 获取用户总分数 */
  public getUserTotalScore(): number{
    return this.userTotalAssetsNum;
  }

  /** 更新用户总分数 */
  public updateUserTotalScore(num: number): void{
    this.userTotalAssetsNum = num;
  }

  /*** 获取用户的得分信息 ***/
  public getUserScoreNum(): number {
    return this.userScoreNum;
  }

  /** 获取当前奖池信息 **/
  public getJackpotInfo(): number {
    return this.jackpotInfo;
  }

  /** 更新下注信息 */
  public updateBetEntityKeyValue(betKey: betKeyType, value: number) {
    this.betEntity[betKey] = value;
  }

  /** 一次性更新下注信息 **/
  public updateBetEntity(ent: BetEntity) {
    this.betEntity = ent;
  }

  public initLocalData(): void {
    if(localStorage.getItem('roundHisInfo')) {
      this.roundHisInfo = JSON.parse(localStorage.getItem('roundHisInfo') as string);
    }
  }
  /** 保存数据到本地 */
  public saveLocalData(): void {
    localStorage.setItem('roundHisInfo', JSON.stringify(this.roundHisInfo));
  }
}

