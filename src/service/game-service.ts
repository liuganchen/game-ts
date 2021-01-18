import {AnimalEntity} from '@/entity/animal-entity';
import {Service} from '@/di/service';
import {animalBgList, siteList} from '@/service/common-data';
import {Subject} from "rxjs";
import {MsgEntity} from "@/entity/msg-entity";
import {initBetMap, initOddsMap} from "@/entity/bet-entity";
import {RoundEntity} from "@/entity/round-entity";

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
  private msgSub = new Subject();
  public msgObs = this.msgSub.asObservable();
  // 用户信息 需要实时更新1，金币信息
  public userTotalAssetsNum = 0;
  // 2，得分信息
  public userScoreNum = 0;
  // 3，下注信息，历史下注信息
  public betMap: Map<string, number> = initBetMap;
  public oddsMap: Map<string, number> = initOddsMap; //  赔率的map
  public historyBetMaps: Map<string, number>[] = [];
  // 系统信息 1，总奖池信息
  public jackpotInfo = 0;
  // 2，游戏回合历史信息
  public roundHisInfo: RoundEntity[] = [];
  // 3，当前回合信息 可以自行修改
  public nowRoundInfo: RoundEntity = new RoundEntity();
  /**
   * 推送消息
   * @param msg
   */
  public pushMsg<T>(msg: MsgEntity<T>) {
    this.msgSub.next(msg);
  }

  /**
   * 获取动物数组的静态数据，用于bg光标的使用
   * 动物的摆放是中心对称的，获取到右上侧的坐标，即可计算拿到所有的坐标位置
   */
  public getAnimalListCommonData(): AnimalEntity[] {
    const sites = siteList;
    return animalBgList.map((animal, index) => {
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
}
