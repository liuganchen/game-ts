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
@Component
export default class GameEvasive extends Vue{
  @Inject()
  private gameService!: GameService
  // 第一个光标的坐标
  evasive01Site: number[] = [0, 0];
  animalList = this.gameService.getAnimalListCommonData();
  activeIndex = 0;
  mounted(){
    setInterval(()=> {
      this.activeIndex++;
      if(this.activeIndex > 27){
        this.activeIndex = 0
      }
    }, 24)
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
