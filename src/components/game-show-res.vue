<template>
  <div class="game-show-res">
    <!--  彩金池  -->
    <div class="jackpot-info">
      <game-coin :value="jackpotInfo"/>
    </div>
    <!--  历史记录  -->
    <div class="history-view">
      <div class="left-btn" @click="scrollView(-80)"></div>
      <div ref="historyScroll" class="history-list-scroll">
        <div ref="historyList" class="history-cell-list">
          <div v-for="item in historyInfo" :key="item.date" :class="item.resultInfo.shortName" class="history-cell"></div>
        </div>
      </div>
      <div class="right-btn" @click="scrollView(80)"></div>
    </div>
    <!--  结果动画显示  -->
    <div class="res-show">
      <div v-if="showRes" class="history-cell" :class="roundEntity.resultInfo.shortName"></div>
    </div>
    <!--  得分显示  -->
    <div class="res-score">
      <div v-if="showScore" class="score-num-view">{{ resScore }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Inject} from "@/di/inject";
import {GameService} from "@/service/game-service";
import {filter, map} from "rxjs/operators";
import {freeIsOver, gameRoundInfoKey} from "@/service/common-data";
import {RoundEntity, RoundEntityWithBet} from "@/entity/round-entity";
import {timer} from "rxjs";
import GameCoin from "@/components/game-coin.vue";
@Component({
  components: {GameCoin}
})
export default class GameShowRes extends Vue{
  @Inject() private game$!: GameService;
  private jackpotInfo = this.game$.getJackpotInfo();
  private historyInfo: RoundEntityWithBet[] | null = this.game$.getHistoryAnimals();
  private roundEntity = new RoundEntity();
  private showRes = false;
  private showScore = false;
  private resScore = 0;
  mounted(){
    this.game$.msgObs
        .pipe(
            filter(msg => msg.type === gameRoundInfoKey),
            filter(msg => msg.data.timeType === 'freeTime'),
            map(msg => msg.data)
        ).subscribe(data => {
          this.roundEntity = data;
          const roundHisInfo = this.game$.getHistoryAnimals();
          // 格式化结果信息，打开播放动画开关
          if(roundHisInfo.length > 0){
            this.showRes = true;
            const lastRoundInfo = roundHisInfo[roundHisInfo.length - 1];
            // 显示结果
            this.resScore = roundHisInfo[roundHisInfo.length - 1]?.setInfo || 0;
            // 没有下注，不显示得分
            this.showScore = (lastRoundInfo.betInfo?.total() || 0) > 0
          }
          // 定时结束动画
          timer(3000).subscribe(() => {
            this.showRes = false;
            this.showScore = false;
            this.jackpotInfo = this.game$.getJackpotInfo();
            // 更新历史结果
            this.historyInfo = this.game$.getHistoryAnimals();
          });
          // 历史结果列表滚动
          timer(3500).subscribe(() => {
            this.scrollView();
          });
          // 通知完成空闲阶段的动画播放。
          timer(4000).subscribe(() => {
            this.game$.pushMsg({type: freeIsOver, data: this.roundEntity})
          });
    })
  }
  scrollView(coord = 80) {
    if(!this.$refs.historyList || !this.$refs.historyScroll){
      return;
    }
    // 内部滚动条的偏移量 left
    const innerLeft = (this.$refs.historyList as HTMLDivElement)?.getBoundingClientRect()?.left || 0;
    const containerLeft = (this.$refs.historyScroll as HTMLDivElement)?.getBoundingClientRect()?.left || 0;
    const offset = innerLeft - containerLeft;
    (this.$refs.historyScroll as HTMLDivElement).scroll({
      left: coord - offset,
      top: 0,
      behavior: "smooth"
    });
  }
}
</script>

<style scoped lang="scss">
div.game-show-res{
  width: 990px;
  height: 301px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  div.jackpot-info{
    width: 280px;
    height: 45px;
    padding-left: 70px;
    padding-right: 10px;
    margin-top: 124px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    line-height: 45px;
  }
  div.history-view{
    margin-top: 162px;
    display: flex;
    justify-content: center;
    align-items: center;
    div.left-btn{
      margin-left: 2px;
      width: 16px;
      height: 42px;
      background-image: url("../assets/res/PNG_BT_MOVEL.png");
      background-position: 0,0;
      &:hover{
        background-position: -16px * 2,0;
      }
      &:active{
        background-position: -16px * 1,0;
      }
    }
    div.right-btn{
      width: 16px;
      height: 42px;
      background-image: url("../assets/res/PNG_BT_MOVER.png");
      background-position: 0,0;
      &:hover{
        background-position: -16px * 2,0;
      }
      &:active{
        background-position: -16px * 1,0;
      }
    }
    div.history-list-scroll{
      width: 570px;
      overflow-x: auto;
      margin-left: 4px;
      margin-right: 4px;
      &::-webkit-scrollbar{
        display: none;
      }
      div.history-cell-list{
        display: flex;
        float: left;
        min-width: 100%;
      }
    }
  }
  div.history-cell{
    width: calc(229px / 3);
    height: calc(135px / 3);
    background-size: calc(2519px / 3), calc(135px / 3);
    background-repeat: no-repeat;
    background-image: url("../assets/ANIMAL_BIG.png");
    &.yz{
      background-position: -229px * 0 / 3, 0;
    }
    &.gz{
      background-position: -229px * 1 / 3, 0;
    }
    &.kq{
      background-position: -229px * 2 / 3, 0;
    }
    &.ly{
      background-position: -229px * 3 / 3, 0;
    }
    &.sz{
      background-position: -229px * 4 / 3, 0;
    }
    &.xm{
      background-position: -229px * 5 / 3, 0;
    }
    &.hz{
      background-position: -229px * 6 / 3, 0;
    }
    &.tz{
      background-position: -229px * 7 / 3, 0;
    }
    &.sy{
      background-position: -229px * 8 / 3, 0;
    }
    &.tp{
      background-position: -229px * 9 / 3, 0;
    }
    &.ts{
      background-position: -229px * 10 / 3, 0;
    }
  }
  div.res-show{
    position: absolute;
    left: 0;
    width: 990px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 165px;
    height: 150px;
    .history-cell{
      animation: identifier 3s ease 1;
    }
  }
  div.res-score{
    position: absolute;
    left: 0;
    width: 990px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 385px;
    height: 39px;
    div.score-num-view{
      width: 273px;
      height: 39px;
      background-image: url("../assets/res/RESULT_FRAME_OTHER.png");
      padding-left: 100px;
      padding-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #D0E4B9;
      animation: identifier2 3s ease 1;
    }
  }
}
div{
  color: #D6C466;
}
@keyframes identifier {
  0% { transform: scale(0.1);opacity: 0}
  10% { transform: scale(3); opacity: 1}
  20% { transform: scale(3); opacity: 1}
  50% { transform: scale(3);opacity: 1 }
  80% { transform: scale(3); opacity: 1}
  90% { transform: scale(3); opacity: 1}
  100% { transform: scale(2); opacity: 0}
}
@keyframes identifier2 {
  0% { transform: scale(0.1);opacity: 0}
  10% { transform: scale(1); opacity: 1}
  20% { transform: scale(1); opacity: 1}
  50% { transform: scale(1);opacity: 1 }
  80% { transform: scale(1); opacity: 1}
  90% { transform: scale(1); opacity: 1}
  100% { transform: scale(1); opacity: 0}
}
</style>
