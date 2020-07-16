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
        // pc
        if (evt.clientX) {
          xDis = evt.clientX - box.left
          yDis = evt.clientY - box.top
        } else {
          // mobile
          xDis = evt.changedTouches[0].clientX - box.left
          yDis = evt.changedTouches[0].clientY - box.top
        }
        //移动的距离=触摸点到图片中心点的距离
        let x = box.width - box.width / 2 - xDis
        let y = box.height - box.height / 2 - yDis
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
  width: 300px;
  display: flex;
  overflow: hidden;
}
.img-demo {
  transition: transform  0.3s;
  width: 100%;
  height: 100%;
  margin: auto;
  cursor: pointer;
}

</style>

