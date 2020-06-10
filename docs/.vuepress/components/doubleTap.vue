<template>
  <section class="double-tap">
    <img
      src="./../public/demo.jpg"
      :style="{transform:`translate3d(${distanceX}px,${distanceY}px,0) scale3d(${scaleX},${scaleY},1)`}"
      class="img-demo"
      ref="imgDemo"
      v-gesture:doubleTap="doubleTap"
    />
  </section>
</template>

<script>
export default {
  name: 'doubleTap',
  data() {
    return {
      distanceX: 0,
      distanceY: 0,
      scaleX: 1,
      scaleY: 1
    }
  },
  methods: {
    // 双击
    doubleTap(evt) {
      if (this.scaleX > 1.5) {
        this.scaleX = this.scaleY = 1
        this.distanceX = this.distanceY = 0
      } else {
        let box = this.$refs.imgDemo.getBoundingClientRect()
        let xDis = 0
        let yDis = 0
        if (evt.clientX) {
          xDis = evt.clientX - box.left
          yDis = evt.clientY - box.top
        } else {
          xDis = evt.changedTouches[0].clientX - box.left
          yDis = evt.changedTouches[0].clientY - box.top
        }
        let y = box.height - yDis * 2 - (box.height / 2 - yDis)
        let x = box.width - xDis * 2 - (box.width / 2 - xDis)
        this.scaleX = this.scaleY = 2
        this.distanceX = x
        this.distanceY = y
      }
    }
  }
}
</script>

<style scoped >
.double-tap {
  height: 300px;
  width: 350px;
  display: flex;
  overflow: hidden;
}
.img-demo {
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  margin: auto;
  cursor: pointer;
}
</style>

