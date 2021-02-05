<template>
  <span>{{ num }}</span>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import {timer} from "rxjs";
@Component
export default class GameCoin extends Vue{
  @Prop({type: Number,default: 0}) value: number;
  num = 0;
  tip = 0;
  @Watch('value') OnValueChange(val: number){
    this.tip = (val - this.num) / 30;
    this.numberChangeAnimation();
  }
  numberChangeAnimation() {
    this.num = Math.ceil(this.num + this.tip);
    if(this.tip > 0  ? (this.num > this.value) : (this.num < this.value)){
      this.num = this.value;
      return;
    }
    timer(24).subscribe(() => {
      this.numberChangeAnimation()
    })
  }
}
</script>

<style scoped>

</style>
