<template>
<div class="bet-container">
  <!-- 操作区域：续投，清空 -->
  <div class="call-clear-action">
    <div class="left-btn">
      <div class="call-btn btn"></div>
      <div class="clear-btn btn"></div>
    </div>
  </div>
  <!-- 单压飞禽走兽操作 -->
  <div class="fly-or-beast">
    <div class="beast-btn btn"></div>
    <div class="game-time"></div>
    <div class="fly-btn btn"><span>{{ '1222223123' }}</span></div>
  </div>
  <!-- 具体下注区域 -->
  <div class="bet-action">
    <div class="animal-1-btn btn"></div>
    <div class="animal-2-btn btn"></div>
    <div class="animal-3-btn btn"></div>
    <div class="animal-4-btn btn"></div>
    <div class="animal-11-btn btn"><span>{{ '123123' }}</span></div>
    <div class="animal-5-btn btn"></div>
    <div class="animal-6-btn btn"></div>
    <div class="animal-7-btn btn"></div>
    <div class="animal-8-btn btn"><span>{{ '123123' }}</span></div>
  </div>
  <!-- 下注倍率选择 -->
  <div class="jet-ton-action">
    <div class="side-view score-num"><span>{{ '5435342' }}</span></div>
    <div class="jetton-btns">
      <div class="jetton-100-btn btn"></div>
      <div class="jetton-1000-btn btn"></div>
      <div class="jetton-1w-btn btn"></div>
      <div class="jetton-10w-btn btn"></div>
      <div class="jetton-100w-btn btn"></div>
    </div>
    <div class="side-view assets-num"><span>{{ '123123123123' }}</span></div>
  </div>
</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Inject} from "@/di/inject";
import {GameService} from "@/service/game-service";

@Component
export default class GameBet extends Vue{
  @Inject private game$!: GameService;
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
        left: 8.5px;
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
        left: 5.7px;
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
          bottom: 13px;
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
