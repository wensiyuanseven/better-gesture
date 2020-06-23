<template>
  <section class="swiperWrap">
    <div
      class="swiper"
      v-gesture:pressMove="pressMove"
      v-gesture:start="start"
      v-gesture:end="end"
      v-gesture:mouseOut="end"
      ref="swiper"
    >
      <div
        :style="[{background:item.bg}]"
        class="item"
        :class="[{'active':index===currentIndex},{'show':index===prev|| index===next,transition}]"
        v-for="(item,index) in data"
        :key="index"
        :ref="'item'+index"
      >{{index}}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'swiper',
  data() {
    return {
      data: [{ bg: 'skyblue' }, { bg: 'burlywood' }, { bg: 'darkgoldenrod' }, { bg: 'silver' }, { bg: 'green' }],
      translateX: 0,
      swiperWidth: 0,
      transition: false, //是否添加动画
      currentIndex: 0
    }
  },
  mounted() {
    this.swiperWidth = this.$refs.swiper.clientWidth
    this.$refs['item' + this.prev][0].style.transform = `translate3d(${-this.swiperWidth + this.translateX}px, 0, 0)`
    this.$refs['item' + this.next][0].style.transform = `translate3d(${this.swiperWidth + this.translateX}px, 0, 0)`
  },
  computed: {
    // 上一个
    prev() {
      if (this.currentIndex === 0) {
        return this.data.length - 1
      } else {
        return this.currentIndex - 1
      }
    },
    // 下一个
    next() {
      if (this.currentIndex === this.data.length - 1) {
        return 0
      } else {
        return this.currentIndex + 1
      }
    }
  },
  methods: {
    start() {
      this.transition = false
    },
    pressMove(evt) {
      let translateX = this.translateX + evt.deltaX
      //控制滑动边界
      if (Math.abs(translateX) > this.swiperWidth) {
        translateX = (translateX / Math.abs(translateX)) * this.swiperWidth
      }
      this.$refs['item' + this.currentIndex][0].style.transform = `translate3d(${translateX}px, 0, 0)`
      // 往右边

      if (this.translateX > 0) {
        this.$refs['item' + this.prev][0].style.transform = `translate3d(${-this.swiperWidth + translateX}px, 0, 0)`
      } else {
        //往右边
        this.$refs['item' + this.next][0].style.transform = `translate3d(${this.swiperWidth + translateX}px, 0, 0)`
      }
      this.translateX = translateX
    },
    end() {
      // 每个上面都有一个transition动画
      // 开启动画
      this.transition = true
      //  往右边滑动&&滑动的距离大于一半
      if (this.translateX > 0 && Math.abs(this.translateX) >= this.swiperWidth / 2) {
        // 往右滑 下一个索引变为第一个
        // 当前index索引为第一个
        if (this.currentIndex === 0) {
          //让索引变为最后一个
          this.currentIndex = this.data.length - 1
        } else {
          this.currentIndex--
        }
        //为第一屏时 位置为0   -102---0
        this.$refs['item' + this.currentIndex][0].style.transform = `translate3d(${0}px, 0, 0)`
        // 上一屏往右移动一整瓶的距离
        this.$refs['item' + this.next][0].style.transform = `translate3d(${this.swiperWidth}px, 0, 0)`
      } else {
        // 小于一半  还原状态
        this.$refs['item' + this.currentIndex][0].style.transform = `translate3d(${0}px, 0, 0)`
        this.$refs['item' + this.prev][0].style.transform = `translate3d(${-this.swiperWidth}px, 0, 0)`
      }
      // 往左边滑动&&距离大于一半
      if (this.translateX < 0 && Math.abs(this.translateX) >= this.swiperWidth / 2) {
        // 向后走
        // 等于最后一个
        if (this.currentIndex === this.data.length - 1) {
          this.currentIndex = 0
        } else {
          this.currentIndex++
        }
        // 当前的等于0
        this.$refs['item' + this.currentIndex][0].style.transform = `translate3d(${0}px, 0, 0)`
        this.$refs['item' + this.prev][0].style.transform = `translate3d(${-this.swiperWidth}px, 0, 0)`
      } else {
        this.$refs['item' + this.currentIndex][0].style.transform = `translate3d(${0}px, 0, 0)`
        this.$refs['item' + this.next][0].style.transform = `translate3d(${this.swiperWidth}px, 0, 0)`
      }
      this.translateX = 0
    }
  }
}
</script>

<style scoped >
.swiperWrap {
  cursor: pointer;
  margin: 0 auto;
  overflow: hidden;
  width: 300px;
  height: 200px;
  border: 2px salmon solid;
  user-select: none;
}
.swiper {
  width: 300px;
  height: 200px;
  position: relative;
  line-height: 200px;
}
.item {
  position: absolute;
  width: 100%;
  height: 100%;
  display: none;
  text-align: center;
  transform: translateY(-100%);
  font-weight: bold;
  font-size: 70px;
}
.active {
  display: block;
  transform: none;
  z-index: 99;
}
.show {
  display: block;
}
.transition {
  transition: 0.3s;
}
</style>
