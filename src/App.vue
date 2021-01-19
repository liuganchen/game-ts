<template>
  <div id="app">
    <game/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Game from "@/components/game.vue";

@Component({
  components: {
    Game,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
img{
  -webkit-user-drag: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
