<template>
  <div class="full-container">
    <div class="game-view">
      <!--  背景  -->
      <game-bg/>
      <!--  游戏动态光标  -->
      <game-evasive/>
      <!--  下注信息  -->
      <game-bet/>
      <!--   游戏结果信息   -->
      <game-show-res/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import GameBg from "@/components/game-bg.vue";
import GameEvasive from "@/components/game-evasive.vue";
import GameBet from "@/components/game-bet.vue";
import {GameService} from "@/service/game-service";
import {Inject} from "@/di/inject";
import {RoundEntity} from "@/entity/round-entity";
import {betIsOver, evasiveIsOver, freeIsOver, gameRoundInfoKey, gameStaticConfig} from "@/service/common-data";
import {filter} from "rxjs/operators";
import GameShowRes from "@/components/game-show-res.vue";

/**
 * 游戏玩法：
 * 1，下注开始：玩家下注
 * 2，本回合游戏开始，开始播放轮转动画，显示结果
 * 3，空闲时间，进行结算（播放结算动画等等）
 */
@Component({components:{GameShowRes, GameBet, GameBg, GameEvasive}})
export default class Game extends Vue{
  @Inject() private game$!: GameService;
  // 当前回合
  roundEntity: RoundEntity = new RoundEntity();
  // 配置
  gameConfig = gameStaticConfig;

  /** 启动游戏开始执行第一个回合 */
  public startGame(): void {
    // -> -> -> 从开始空闲时间开始游戏
    this.startFree();
  }

  /** 开始 */
  public startBegin() {
    // 进入开始阶段
    console.log('【开始】游戏进入开始时间')
    this.roundEntity.timeType = 'startTime';
    this.roundEntity.time = this.gameConfig[this.roundEntity.timeType];
    // 广播阶段更新
    this.game$.pushMsg({type: gameRoundInfoKey, data: this.roundEntity})
  }

  /** 开始空闲时间 */
  public startFree(){
    console.log('【空闲】游戏进入空闲时间', '空闲时间为：', this.gameConfig.freeTime)
    this.roundEntity.timeType = "freeTime";
    this.roundEntity.time = this.gameConfig.freeTime;
    this.game$.pushMsg({type: gameRoundInfoKey, data: this.roundEntity})
  }
  /** 开始下注时间 **/
  startBet() {
    console.log('【下注】游戏进入下注时间')
    // 一定时间后，开始下注
    this.roundEntity.timeType = 'betTime';
    this.roundEntity.time = this.gameConfig[this.roundEntity.timeType];
    // 广播阶段更新
    this.game$.pushMsg({type: gameRoundInfoKey, data: this.roundEntity})
  }

  /** 游戏运行 + 监听 **/
  mounted(){
    // 开始游戏
    this.startGame();
    // 监听下注阶段结束,开始轮转
    this.game$.msgObs.pipe(filter(msg => msg.type === betIsOver)).subscribe(()=> {
      // 计算目标动物
      this.roundEntity.resultInfo = this.game$.getResultAnimalInfo();
      this.startBegin();
    })
    // 监听空闲时间结束，进入下注操作
    this.game$.msgObs.pipe(filter(msg => msg.type === freeIsOver)).subscribe(()=>{
      this.startBet();
    })
    // 监听轮转结束，进入空闲时间，播放结果动画等
    this.game$.msgObs.pipe(filter(msg => msg.type === evasiveIsOver)).subscribe(()=>{
      // 计算结果
      this.game$.getBetInfo(this.roundEntity);
      this.startFree();
    })
  }
}
</script>

<style scoped lang="css">
div.full-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
}
@media(max-width: 990px) {
  div.full-container{
    width: 990px;
  }
}
@media(max-height: 710px) {
  div.full-container{
    height: 710px;
  }
}

div.game-view{
 position: relative;
  width: 990px;
  height: 710px;
}

</style>
