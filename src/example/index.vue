<template>
  <section class="index">
    <div
      class="example"
      :style="{transform:`translate3d(${distanceX1}px,${distanceY1}px,0)`}"
      v-gesture:pressMove="pressMove1"
      v-gesture:doubleTap="doubleTap"
      v-gesture:swipe="swipe"
    >
      <div>拖动</div>
    </div>
    <div
      class="example"
      :style="{transform:`translate3d(${distanceX2}px,${distanceY2}px,0)`}"
      v-gesture:pressMove="pressMove2"
      v-gesture:doubleTap="doubleTap"
      v-gesture:swipe="swipe"
    >
      <div>拖动</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      distanceX1: 0,
      distanceY1: 0,
      distanceX2: 0,
      distanceY2: 0
    }
  },
  methods: {
    pressMove1(e) {
      this.distanceX1 += e.deltaX
      this.distanceY1 += e.deltaY
    },
    pressMove2(e) {
      this.distanceX2 += e.deltaX
      this.distanceY2 += e.deltaY
    },
    doubleTap() {

      console.log('双击')
    },
    swipe(event) {
      console.log(event)
    }
  }
}
</script>

<style>
.example {
  width: 500px;
  height: 500px;
  border: 1px solid sienna;
  text-align: center;
  line-height: 500px;
  cursor: pointer;
  user-select:none;
}
</style>
