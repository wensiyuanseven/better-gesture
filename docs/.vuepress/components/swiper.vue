<template>
  <section class="swiper" ref="swiper">
    <ul
      class="content"
      ref="content"
      :class="{transition}"
      :style="{transform}"
      v-gesture:pressMove="pressMove"
      v-gesture:start="start"
      v-gesture:end="end"
      v-gesture:mouseOut="end"
    >
      <li
        :style="{background:item.bg}"
        class="item"
        v-for="(item,index) in data"
        :key="index"
      >{{item.index}}</li>
    </ul>
    <div class="pointWrap">
      <nav
        class="point"
        :class="{focus:currentIndex%pointArr.length===index}"
        v-for="(item,index) in pointArr"
        :key="index"
      ></nav>
    </div>
  </section>
</template>

<script>
import doubleTapVue from './doubleTap.vue'
export default {
  name: 'swiper',
  data() {
    return {
      data: [],
      translateX: 0,
      swiperWidth: 0,
      fingerMove: 0, //手指移动的距离
      transition: false, //是否添加动画
      timer: null,
      index: 0
    }
  },
  components: {},
  watch: {},
  mounted() {
    this.init()
    this.interval()
  },
  computed: {
    pointArr() {
      return this.data.slice(0, this.data.length / 2)
    },
    transform() {
      return this.translateX === 0 ? 'none' : `translate3d(${this.translateX}px,0,0)`
    },
    // 根据当前移动的距离计算出应该停在第几张
    currentIndex() {
      return Math.round(Math.abs(this.translateX / this.swiperWidth))
    }
  },
  methods: {
    interval() {
      this.transition = true
      // 不要有动画 瞬间跳回0
      this.timer = setInterval(() => {
        /*判断走到最后一张快走过界了,拉到第一组最后一张 */
        if (this.index === this.data.length - 1) {
          this.transition = false
          // 让index重置回第一组的最后一张 然后再++ 也就是走第一张
          this.index = this.data.length / 2 - 1
          // 立马重置回第一组的最后一张
          this.translateX = -this.index * this.swiperWidth
        }
        this.index++
        setTimeout(() => {
          this.transition = true
          this.translateX = -this.index * this.swiperWidth
        }, 0)
      }, 3000)
    },
    init() {
      for (let i = 0; i < 3; i++) {
        this.data.push({
          index: i + 1,
          bg: '#' + ((Math.random() * 0xffffff) << 0).toString(16)
        })
      }
      // 复制一分数据
      this.data = this.data.concat(this.data.slice(0))
      this.swiperWidth = this.$refs.swiper.clientWidth
    },
    start() {
      clearInterval(this.timer)
      this.transition = false
      // 处理无缝
      // 第一张
      if (this.currentIndex === 0) {
        this.translateX = -(this.data.length / 2) * this.swiperWidth
      }
      // 最后一张
      if (this.currentIndex === this.data.length - 1) {
        this.translateX = -(this.data.length / 2 - 1) * this.swiperWidth
      }
    },
    pressMove(evt) {
      this.translateX += evt.deltaX
    },
    end() {
      // 计算停留在第几张
      let currentIndex = this.currentIndex
      this.transition = true
      this.translateX = -currentIndex * this.swiperWidth
      this.index = currentIndex
      // 开启定时器
      this.interval()
    }
  }
}
</script>

<style scoped>
.swiper ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.swiper {
  cursor: pointer;
  user-select: none;
  width: 300px;
  height: 200px;
  border: 1px skyblue solid;
  overflow: hidden;
  position: relative;
}
.swiper .content {
  display: flex;
}
.swiper .content .item {
  flex-shrink: 0;
  width: 300px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 60px;
}
.transition {
  transition: 0.3s;
}
.pointWrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  bottom: 10px;
  z-index: 2;
  display: flex;
  justify-content: center;
}
.pointWrap nav {
  margin: 2px;
  width: 10px;
  height: 10px;
  border: 1px skyblue solid;
  border-radius: 50%;
}
.focus {
  background: sienna;
}
</style>
