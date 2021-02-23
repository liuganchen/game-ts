<template>
<div class="evasive-container">
  <!-- 第一种光标：选中一个动物 -->
  <div  v-for="animal in animalList"
        :key="animal.id"
        class="evasive01"
        :style="'top:' + animal.rect.y + 'px; left: ' + animal.rect.x + 'px'">
    <img src="@/assets/game_evasive01.png" :class="activeIndex === animal.index? 'active' : 'opacity'" alt="">
  </div>
</div>
</template>

<script lang="ts">
import {GameService} from '@/service/game-service';
import {Inject} from '@/di/inject';
import {Component, Vue} from "vue-property-decorator";
import {filter, map} from "rxjs/operators";
import {evasiveIsOver, gameRoundInfoKey, gameStaticConfig} from "@/service/common-data";
import {AnimalEntity} from "@/entity/animal-entity";
import {timer} from "rxjs";
@Component
export default class GameEvasive extends Vue{
  @Inject()
  private gameService!: GameService
  // 第一个光标的坐标
  animalList = this.gameService.getAnimalListCommonData();
  // 初始化的index 为0
  activeIndex = 0;
  resultAnimal: AnimalEntity = new AnimalEntity();
  totalStep = 0;
  // 6 - 15
  sleepStepNum = 10;

  /**
   * 计算轮转动画的时间数组
   * 1，至少要跑两圈
   * 2，跑动是慢 -》快 -》 慢
   */
  computeRotateNumList() {
    // 目标下标
    const resIndex = this.resultAnimal.index;
    const oneCNum = this.animalList.length;
    // 当前下标
    this.totalStep = oneCNum * gameStaticConfig.turns;
    if(Number(resIndex) > this.activeIndex){
      this.totalStep = this.totalStep + (Number(resIndex) - this.activeIndex);
    }else {
      this.totalStep = this.totalStep + Number(resIndex) + (oneCNum - this.activeIndex);
    }
    // 当前坐标 到 目标坐标移动距离 . 前四个很慢， 后4个很慢。
    this.sleepStepNum = GameService.randomNumForNTOM(15, 6);
  }

  /**
   *
   * @param step 计数器
   * @param timeNum 延时
   */
  startRotate(step = 0, timeNum = 150) {
    timer(timeNum).subscribe(()=>{
      timeNum = this.updateTimeNum(step, timeNum);
      step = step + 1;
      this.updateActiveIndex();
      // 超过两圈，并且下标相同，代表到了目标位置
      if(step > this.animalList.length * gameStaticConfig.turns && this.activeIndex === this.resultAnimal.index){
        // 发布消息，结束轮转
        this.gameService.pushMsg({type: evasiveIsOver, data: {}});
      } else {
        this.startRotate(step, timeNum);
      }
    })
  }

  /**
   * 更新延时
   * @param step
   * @param timeNum
   */
  updateTimeNum(step: number, timeNum = 240): number {
     if(step > this.totalStep - this.sleepStepNum){
      timeNum = timeNum + 50;
    } else {
      timeNum = timeNum - step * step;
    }
    if(timeNum < 24){
      timeNum = 24;
    }
    if(timeNum > 500){
      timeNum = 500;
    }
    return timeNum;
  }
  updateActiveIndex(){
    this.activeIndex ++;
    if(this.activeIndex > 27){
      this.activeIndex = 0
    }
  }


  mounted(){
    this.gameService.msgObs
        .pipe(
            filter(msg => msg.type === gameRoundInfoKey && msg.data.timeType === 'startTime'),
            map(msg => msg.data))
        .subscribe(data => {
          this.resultAnimal = data.resultInfo;
          console.log('目标动物', this.resultAnimal.name,this.resultAnimal.index);
          // 计算动画,开始
          this.computeRotateNumList();
          this.startRotate()
        })
  }
}
</script>

<style scoped lang="scss">
div.evasive-container{
}
.evasive01{
  position: absolute;
  left: 0;
  top: 0;
  width: 91px;
  height: 93px;
  img{
    object-fit: cover;
    &.active{
      opacity: 1.0;
    }
    &.opacity{
      transition: opacity 0.3s;
      opacity: 0.0;
    }
  }
}
</style>
