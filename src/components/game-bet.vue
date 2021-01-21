<template>
<div class="bet-container">
  <!-- 操作区域：续投，清空 -->
  <div class="call-clear-action">
    <div class="left-btn">
      <div class="call-btn btn" :class="disabledClass" @click="copyBeforeBet"></div>
      <div class="clear-btn btn" :class="disabledClass" @click="clearNowBet"></div>
    </div>
  </div>
  <!-- 单压飞禽走兽操作 -->
  <div class="fly-or-beast">
    <div class="fly-btn btn" :class="disabledClass" @click="betAction('fq')"><span>{{ nowBetEntity.fq }}</span></div>
    <div class="game-time">
      <div class="label" :class="roundInfo.timeType"></div>
      <div v-if="roundInfo.timeType === 'betTime'" class="time-value"> {{ roundInfo.time }}</div>
    </div>
    <div class="beast-btn btn" :class="disabledClass" @click="betAction('zs')"><span>{{ nowBetEntity.zs }}</span></div>
  </div>
  <!-- 具体下注区域 -->
  <div class="bet-action">
    <div class="animal-1-btn btn" :class="disabledClass" @click="betAction('yz')"><span>{{ nowBetEntity.yz }}</span></div>
    <div class="animal-2-btn btn" :class="disabledClass" @click="betAction('gz')"><span>{{ nowBetEntity.gz }}</span></div>
    <div class="animal-3-btn btn" :class="disabledClass" @click="betAction('kq')"><span>{{ nowBetEntity.kq }}</span></div>
    <div class="animal-4-btn btn" :class="disabledClass" @click="betAction('ly')"><span>{{ nowBetEntity.ly }}</span></div>
    <div class="animal-11-btn btn" :class="disabledClass" @click="betAction('sy')"><span>{{ nowBetEntity.sy }}</span></div>
    <div class="animal-5-btn btn" :class="disabledClass" @click="betAction('sz')"><span>{{ nowBetEntity.sz }}</span></div>
    <div class="animal-6-btn btn" :class="disabledClass" @click="betAction('xm')"><span>{{ nowBetEntity.xm }}</span></div>
    <div class="animal-7-btn btn" :class="disabledClass" @click="betAction('hz')"><span>{{ nowBetEntity.hz }}</span></div>
    <div class="animal-8-btn btn" :class="disabledClass" @click="betAction('tz')"><span>{{ nowBetEntity.tz }}</span></div>
  </div>
  <!-- 下注倍率选择 -->
  <div class="jet-ton-action">
    <div class="side-view score-num"><span>{{ scoreNum }}</span></div>
    <div class="jetton-btns">
      <div class="jetton-100-btn btn" :class="disabledClass" @click="changeJetTon(100)"></div>
      <div class="jetton-1000-btn btn" :class="disabledClass" @click="changeJetTon(1000)"></div>
      <div class="jetton-1w-btn btn" :class="disabledClass" @click="changeJetTon(10000)"></div>
      <div class="jetton-10w-btn btn" :class="disabledClass" @click="changeJetTon(100000)"></div>
      <div class="jetton-100w-btn btn" :class="disabledClass" @click="changeJetTon(1000000)"></div>
    </div>
    <div class="side-view assets-num"><span>{{ totalAssets }}</span></div>
  </div>
</div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {Inject} from "@/di/inject";
import {GameService} from "@/service/game-service";
import {betIsOver, gameRoundInfoKey} from "@/service/common-data";
import {filter, map} from "rxjs/operators";
import {MsgEntity} from "@/entity/msg-entity";
import {RoundEntity} from "@/entity/round-entity";
import {BetEntity, betKeyType} from "@/entity/bet-entity";
import {timer} from "rxjs";

@Component
export default class GameBet extends Vue{
  @Inject() private game$!: GameService;
  // 当前回合信息
  roundInfo: RoundEntity = new RoundEntity();
  // 默认一百倍率
  jetTonNum = 100;
  beforeBetEntity = new BetEntity();
  nowBetEntity = new BetEntity();
  // 本金，积分
  totalAssets = 0;
  scoreNum = 0;

  @Watch('totalAssets') onTotalAssetsChange(){
    this.game$.userTotalAssetsNum = this.totalAssets;
  }
  get disabledClass() {
    return this.roundInfo.timeType === 'betTime' ? '' : 'disabled';
  }
  copyBeforeBet() {
    if(this.roundInfo.timeType === 'betTime') {
      this.nowBetEntity = this.beforeBetEntity;
      this.totalAssets -= this.nowBetEntity.total();
      console.log('【续压】......')
    }
  }
  changeJetTon(jetNum: number) {
    if(this.roundInfo.timeType === "betTime") {
      this.jetTonNum = jetNum;
    }
  }
  clearNowBet() {
    if(this.roundInfo.timeType === "betTime") {
      this.totalAssets += this.nowBetEntity.total();
      this.nowBetEntity = new BetEntity();
      this.game$.updateBetEntity(this.nowBetEntity);
    }
  }
  betAction(keyName: betKeyType) {
    if(this.roundInfo.timeType !== "betTime") {
      return;
    }
    if(this.totalAssets < this.jetTonNum) {
      return;
    }
    this.nowBetEntity[keyName] = this.nowBetEntity[keyName] + this.jetTonNum;
    // 播放金币减少的动画
    //
    this.game$.updateBetEntityKeyValue(keyName, this.nowBetEntity[keyName]);
    // 更新金币
    this.totalAssets -= this.jetTonNum;
  }
  /** 空闲时间操作 **/
  public freeTimeAction() {
    // 清空本轮下注
    this.beforeBetEntity = this.nowBetEntity;
    this.nowBetEntity = new BetEntity();
    // 查询金币，如果金币 / 积分 增加，开始播放金币增加的动画
    this.totalAssets = this.game$.userTotalAssetsNum;
    this.scoreNum = this.game$.userScoreNum;
  }
  /** 下注时间操作 **/
  public betTimeAction() {
    // 开始倒计时，下注区域被激活，可以操作
    this.beginBetTimer();
    // todo 测试需要，自动续压
    console.log('【test】程序控制：自动续压');
    this.copyBeforeBet();
  }
  /** 开始时间操作 **/
  public startTimeAction() {
    // 下注区域被锁定，不许任何操作
  }

  beginBetTimer() {
    if(this.roundInfo.time <= 0){
      // 计时结束
      this.game$.pushMsg({type: betIsOver, data: {}});
      return;
    }
    timer(1000).subscribe(() => {
      this.roundInfo.time -= 1;
      this.beginBetTimer();
    })
  }

  mounted(){
    this.game$.msgObs
        .pipe(filter((msg: MsgEntity) => msg.type === gameRoundInfoKey),
            map(msg => msg.data))
        .subscribe(data => {
          this.roundInfo.time = data.time;
          this.roundInfo.timeType = data.timeType;
          // 下注时间，做什么 空闲时间，做什么 开始时间，做什么
          switch (this.roundInfo.timeType){
            case "betTime":
              this.betTimeAction();
              break;
            case "freeTime":
              this.freeTimeAction();
              break;
            case "startTime":
              this.startTimeAction();
              break;
          }
        })
  }
}
</script>

<style scoped lang="scss">
span{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
div.bet-container{
  width: 990px;
  height: 301px;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // 内容左下角
  div.btn{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    span{
      z-index: 2;
      user-select: none;
      color: #D9B058;
    }
  }

  div.call-clear-action{
    padding-left: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div.btn{
      width: 73px;
      height: 30px;
      background-position: 0,0;
      &:hover{
        background-position: -146px,0;
      }
      &:active{
        background-position: -73px,0;
      }
      &.disabled{
        background-position: -73px * 4,0;
      }
      &.call-btn{
        background-image: url("../assets/bet/PNG_BT_CONTINUANCE.png");
      }
      &.clear-btn{
        background-image: url("../assets/bet/PNG_BT_CLLEARUP.png");
        margin-top: 3px;
      }
    }
  }

  div.fly-or-beast{
    padding-left: 17px;
    padding-right: 17px;
    margin-top: 7px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.btn{
      width: 243px;
      height: 68px;
      background-position: 0,0;
      position: relative;
      &::before{
        position: absolute;
        background-image: url("../assets/bet/PNG_PUN01.png");
        width: 144px;
        height: 45px;
        background-position: 0,0;
        content: '';
        z-index: 0;
        left: 9px;
        bottom: 15px;
      }
      padding-left: 12px;
      padding-bottom: 18px;
      span{
        font-size: 20px;
        line-height: 24px;
      }
      &:hover{
        background-position: -243px * 2,0;
      }
      &:active{
        background-position: -243px,0;
        &::before{
          bottom: 15px;
        }
      }
      &.disabled{
        background-position: -243px * 4,0;
      }
      &.beast-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_10.png");
      }
      &.fly-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_9.png");
      }
    }
    div.game-time{
      margin-top: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      div.label{
        width: 85.666666666666666666666666667px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("../assets/game/TIME_FLAG.png");
        &.startTime{
          background-position: -85.666666666666666666667px * 2 , 0;
        }
        &.betTime{
          background-position: -85.666666666666666666667px * 1 , 0;
        }
        &.freeTime{
          background-position: 85.666666666666666666667px * 0 , 0;
        }
      }
      div.time-value{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #7FD1A9;
        font-size: 20px;
        line-height: 28px;
        width: 38px;
      }
    }
  }

  div.bet-action{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 17px;
    padding-right: 17px;
    width: 100%;
    div.btn{
      width: 85px;
      height: 110px;
      background-position: 0,0;
      position: relative;
      &::before{
        position: absolute;
        background-image: url("../assets/bet/PNG_PUN03.png");
        width:74px;
        height: 26px;
        background-position: 0,0;
        content: '';
        z-index: 0;
        left: 6px;
        bottom: 16px;
      }
      padding-left: 10px;
      padding-bottom: 18px;
      &:hover{
        background-position: -85px * 2,0;
      }
      &:active{
        background-position: -85px,0;
        &::before{
          bottom: 14px;
        }
      }
      &.disabled{
        background-position: -85px * 4,0;
      }
      &.animal-1-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_1.png");
      }
      &.animal-2-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_2.png");
      }
      &.animal-3-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_3.png");
      }
      &.animal-4-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_4.png");
      }
      &.animal-5-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_5.png");
      }
      &.animal-6-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_6.png");
      }
      &.animal-7-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_7.png");
      }
      &.animal-8-btn{
        background-image: url("../assets/bet/PNG_BT_ANIMAL_8.png");
      }
      &.animal-11-btn{
        width: 182px;
        background-image: url("../assets/bet/PNG_BT_ANIMAL_11.png");
        &::before{
          background-image: url("../assets/bet/PNG_PUN02.png");
          width:112px;
        }
        &:hover{
          background-position: -182px * 2,0;
        }
        &:active{
          background-position: -182px,0;
        }
        &.disabled{
          background-position: -182px * 4,0;
        }
      }
    }
  }

  div.jet-ton-action{
    padding-left: 17px;
    padding-right: 17px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.side-view{
      width: 275px;
      padding-left: 95px;
      padding-right: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      span{
        color: #C4B773;
        font-size: 20px;
      }
    }
    div.jetton-btns{
      display: flex;
      justify-content: center;
      align-items: center;
      div.btn{
        width: 77px;
        height: 40px;
        background-position: 0,0;
        &:hover{
          background-position: -77px * 2 0;
        }
        &:active{
          background-position: -77px 0;
        }
        &.disabled{
          background-position: -77px * 4 0;
        }
        &.choose{
          background-position: -77px * 3,0;
        }
        &.jetton-100-btn{
          background-image: url("../assets/bet/PNG_BT_JETTON100.png");
        }
        &.jetton-1000-btn{
          background-image: url("../assets/bet/PNG_BT_JETTON1000.png");
        }
        &.jetton-1w-btn{
          background-image: url("../assets/bet/PNG_BT_JETTON1w.png");
        }
        &.jetton-10w-btn{
          background-image: url("../assets/bet/PNG_BT_JETTON10w.png");
        }
        &.jetton-100w-btn{
          background-image: url("../assets/bet/PNG_BT_JETTON100w.png");
        }
      }
    }
  }
}
</style>
