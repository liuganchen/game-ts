<template>
    <div class="game-bg-view">
      <img src="@/assets/bg.png" class="bg-img" alt="">
      <img src="@/assets/animal-bg.png" class="animal-bg-img" alt="">
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class GameBg extends Vue{
}
</script>

<style scoped lang="css">
img.bg-img{
  position: absolute;
  top: 0;
  left: 0;
}
img.animal-bg-img{
  position: absolute;
  top: 0;
  left: 0;
}
</style>
