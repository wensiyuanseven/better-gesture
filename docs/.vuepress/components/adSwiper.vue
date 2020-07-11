<template>
  <section class="adSwiper">
    <div
      :class="{transition}"
      class="wrap"
      ref="wrap"
      :style="{transform:`translate3d(0px,${distanceY}px,0)`}"
    >
      <p v-for="(item,index) in data" :key="index">{{item}}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'adSwiper',
  data() {
    return {
      distanceY: 0,
      timer: 0,
      data: ['女生真的会拧不开瓶盖吗？', '双缝干涉实验恐怖吗？恐怖在哪？', '明星现实中真的很漂亮吗?'],
      transition: false
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      setInterval(() => {
        this.data.push(this.data[0])
        this.transition = true
        this.distanceY = -50
        this.$refs.wrap.addEventListener('transitionend', this.animation)
      }, 2000)
    },
    animation() {
      this.$refs.wrap.removeEventListener('transitionend', this.animation)
      this.transition = false
      this.data.shift()
      this.distanceY = 0
    }
  }
}
</script>

<style scoped >
.adSwiper {
  width: 300px;
  height: 50px;
  border: 2px solid skyblue;
  overflow: hidden;
}
.transition {
  transition: 1s;
}

.wrap p {
  box-sizing: border-box;
  float: left;
  text-align: center;
  width: 100%;
  height: 100%;
  line-height: 50px;
  margin: 0;
}
</style>
