<template>
  <section class="rotatewrap">
    <p>angle:{{angle}}</p>
    <div
      class="rotate"
      v-gesture:moreFingerStart="moreFingerStart"
      v-gesture:rotate="rotate"
      :style="{ transform:`rotate(${angle}deg)`}"
    >双指旋转</div>
  </section>
</template>

<script>
let initRotate = 1
export default {
  name: 'rotate',
  data() {
    return {
      angle: 15
    }
  },
  methods: {
    // 一根以上手指触发
    moreFingerStart() {
      initRotate = this.angle
    },
    rotate(evt) {
      this.angle = initRotate += evt.angle
    }
  }
}
</script>

<style scoped >
.rotate {
  margin-top: 20px;
  width: 100px;
  height: 100px;
  background: skyblue;
  user-select: none;
  line-height: 100px;
  text-align: center;
}
</style>
