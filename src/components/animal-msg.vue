<template>
<div>
  {{ info }}
</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({})
export default class TodoMsg extends Vue{
  info = '当前点击';
}
</script>

<style scoped>

</style>
