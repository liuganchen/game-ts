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

@Component({components:{GameBet, GameBg, GameEvasive}})
export default class Game extends Vue{
  /**
   * 启动游戏
   * 1，开始执行第一个回合。
   */
  public startGame(): void {
    //
  }

  /**
   * 启动本回合
   * 一个回合包括
   * 1，准备阶段 ---- 计时30S，用户下注，开始时计算出结果
   * 2，旋转阶段 ---- 。然后打圈旋转到目标结果。
   * 3，计算阶段 ---- 2s 播放动画，结算用户金币。
   * startRound() 需要计时30S + 计算出结果 + 调用旋转func startRotate();
   */
  public startRound(): void {
    //
  }

  /**
   * 开始旋转，通知evasive组件开始动画
   */
  public startRotate(): void {
    //
  }

  /**
   * 结算方法
   * 计算用户彩金，更新奖池，更新回合结果历史
   */
  public startSettle(): void{
    //
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
