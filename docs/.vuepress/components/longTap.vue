<template>
  <section class="longTap">
    <div v-gesture:longTap="longTap" class="long-tap" :style="{background:randomColor}">长按</div>
  </section>
</template>

<script>
export default {
  name: 'longTap',
  data() {
    return {
      randomColor: 'silver'
    }
  },
   methods: {
    longTap(e) {
      this.randomColor ='#'+(Math.random()*0xffffff<<0).toString(16)
    }
  }
}
</script>

<style scoped >
.long-tap{
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    user-select: none;
    cursor: pointer;
}
</style>
