<template>
  <div class="full-container">
    <div class="game-view">
      <!--  背景  -->
      <game-bg/>
      <!--  游戏动态光标  -->
      <game-evasive/>
      <!--  下注信息  -->
      <game-bet/>
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
import {evasiveIsOver, gameRoundInfoKey, gameStaticConfig} from "@/service/common-data";
import {timer} from "rxjs";
import {filter} from "rxjs/operators";

@Component({components:{GameBet, GameBg, GameEvasive}})
export default class Game extends Vue{
  @Inject() private game$!: GameService;
  // 当前回合
  roundEntity: RoundEntity = new RoundEntity();
  // 配置
  gameConfig = gameStaticConfig;
  mounted(){
    // 开始游戏
    this.startGame();
    // 监听轮圈结束
    this.game$.msgObs.pipe(filter(msg => msg.type === evasiveIsOver)).subscribe(()=>{
      // 计算结果
      const result = this.game$.getBetInfo(this.roundEntity);
      // 重新启动回合计时器
      this.roundEntity.nextType();
      this.roundEntity.time = this.gameConfig[this.roundEntity.timeType];
      this.startRound();
    })
  }
  /**
   * 启动游戏
   * 1，开始执行第一个回合。
   */
  public startGame(): void {
    // 初始化
    this.roundEntity.timeType = "freeTime";
    this.roundEntity.time = this.gameConfig.freeTime;
    this.startRound();
  }

  /**
   * 启动本回合
   * 一个回合包括
   * 1，下注阶段 ---- 计时30S，用户下注，开始时计算出结果
   * 2，开始阶段 ---- 中断计时器。然后打圈旋转到目标结果。
   * 3，空闲阶段 ---- 2s 播放动画，结算用户金币。
   * startRound() 需要计时30S + 计算出结果 + 调用旋转func startRotate();
   */
  public startRound(): void {
    this.game$.pushMsg({type: gameRoundInfoKey, data: this.roundEntity})
    this.roundEntity.time = this.roundEntity.time - 1;
    if(this.roundEntity.time <= 0) {
      this.roundEntity.nextType();
      this.roundEntity.time = this.gameConfig[this.roundEntity.timeType];
      // 如果下注结束 -》 开始游戏需要计算 目标结果
      if(this.roundEntity.timeType === 'startTime') {
        this.roundEntity.resultInfo = this.game$.getResultAnimalInfo();
        this.game$.pushMsg({type: gameRoundInfoKey, data: this.roundEntity})
        // 结束计时器
        return;
      }
    }
    // 每秒刷新
    timer(1000).subscribe(()=> this.startRound());
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
