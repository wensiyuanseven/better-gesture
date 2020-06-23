<template>
  <section class="adSwipeTwo">
    <div class="wrap" ref="wrap" :style="{transform:`translate3d(${distanceX}px,0px,0)`}">
      <p v-for="(item,index) in data" :key="index">{{item}}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'adSwipeTwo',
  data() {
    return {
      distanceX: 0,
      timer: null,
      data: ['女生真的会拧不开瓶盖吗？', '双缝干涉实验恐怖吗？恐怖在哪？', '明星现实中真的很漂亮吗?']
    }
  },
  watch: {},
  mounted() {
    this.move()
  },
  methods: {
    move() {
      // this.timer = setInterval(() => {
      if (this.distanceX >= 0) {
        this.data.push(this.data[0])
      }
      if (Math.abs(this.distanceX) >= 300) {
        cancelAnimationFrame(this.timer)
        this.data.shift()
        this.distanceX = 0
        this.move()
      } else {
        this.distanceX += -1
        this.timer = requestAnimationFrame(this.move)
      }
      // }, 15)
    }
  }
}
</script>

<style scoped >
.adSwipeTwo {
  width: 300px;
  height: 50px;
  border: 2px solid sienna;
  overflow: hidden;
}

.wrap {
  display: flex;
  width: 100%;
  height: 100%;
}

.wrap p {
  flex: none;
  box-sizing: border-box;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  line-height: 50px;
  margin: 0;
}
</style>
