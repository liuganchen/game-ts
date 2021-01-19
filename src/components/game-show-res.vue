<template>
  <div class="game-show-res">
    <!--  彩金池  -->
    <div class="jackpot-info">{{ jackpotInfo }}</div>
    <!--  历史记录  -->
    <div class="history-view">
      <div class="left-btn"></div>
      <div class="history-list-scroll">
        <div class="history-cell-list">
          <div v-for="item in historyInfo" :key="item.date" :class="item.resultInfo.shortName" class="history-cell"></div>
        </div>
      </div>
      <div class="right-btn"></div>
    </div>

    <!--  结果动画显示  -->
    <div></div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Inject} from "@/di/inject";
import {GameService} from "@/service/game-service";
import {filter} from "rxjs/operators";
import {gameRoundInfoKey} from "@/service/common-data";
@Component({})
export default class GameShowRes extends Vue{
  @Inject() private game$!: GameService;
  private jackpotInfo = this.game$.jackpotInfo;
  private historyInfo = this.game$.roundHisInfo;
  mounted(){
    this.game$.msgObs
        .pipe(
            filter(msg => msg.type === gameRoundInfoKey),
            filter(msg => msg.data.timeType === 'freeTime')
        ).subscribe(() => {
          this.jackpotInfo = this.game$.jackpotInfo;
          this.historyInfo = this.game$.roundHisInfo;
          console.log(this.historyInfo);
    })
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
  }
  div.history-view{
    display: flex;
    justify-content: center;
    align-items: center;
    div.history-list-scroll{
      width: 500px;
      overflow-x: auto;
      div.history-cell-list{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 180px;
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
          &.tx{
            background-position: -229px * 10 / 3, 0;
          }
        }
      }
    }
  }

}
div{
  color: #D6C466;
}
</style>
