<template>
  <section class="pinchwrap">
    <p>zoom:{{scale}}</p>
    <div
      class="pinch"
      v-gesture:moreFingerStart="moreFingerStart"
      v-gesture:pinch="pinch"
      :style="{transform:`scale3d(${scale},${scale},1)`}"
    >双指缩放</div>
  </section>
</template>

<script>
let initScale = 1
export default {
  name: 'pinch',
  data() {
    return {
      scale: 1
    }
  },
  methods: {
    // 一根以上手指触发
    moreFingerStart() {
      initScale = this.scale
    },
    pinch(evt) {
      this.scale = initScale * evt.zoom
    }
  }
}
</script>

<style scoped >
.pinch {
  margin-top: 20px;
  width: 100px;
  height: 100px;
  background: skyblue;
  user-select: none;
  line-height: 100px;
  text-align: center;
}
</style>
