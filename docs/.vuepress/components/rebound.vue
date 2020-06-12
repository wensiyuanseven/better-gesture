<template>
  <div>
    move:{{distanceY}}
    scrollTop: {{scrollTop}}
    <div class="rebound" @scroll="scrolll" ref="wrap">
      <div
        class="page"
        v-gesture:touchStart="touchStart"
        v-gesture:pressMove="pressMove"
        v-gesture:end="end"
        v-gesture:mouseLeave="end"
        :style="{transform:`translate3d(0,${distanceY}px,0)`}"
      >
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
        <p>下拉回弹</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rebound',
  data() {
    return {
      distanceY: 0,
      clientY: 0,
      scrollTop: 0,
      startY: 0,
      currentY: 0
    }
  },
  methods: {
    touchStart(evt) {
      this.startY = evt.clientY || evt.touches[0].clientY
    },
    scrolll(event) {
      this.scrollTop = this.$refs.wrap.scrollTop
    },
    pressMove(evt) {
      evt.stopPropagation()
      this.currentY = evt.clientY || evt.touches[0].clientY
      //  滚动到顶部，并且下拉
      if (this.scrollTop === 0 && this.currentY - this.startY > 0) {
        evt.preventDefault()
        this.distanceY += Math.round(evt.deltaY)
      }
    },
    end(evt) {
      if (this.distanceY > 0) {
        this.animation(this.distanceY, 0 - this.distanceY, val => {
          this.distanceY = Math.round(val)
        })
      }
    },
    animation(startValue, diffValue, callback) {
      let d = Math.ceil(500 / 16.7)
      let timer = null
      let t = 0
      move()
      function move() {
        if (t > d || d == 0) {
          cancelAnimationFrame(timer)
          t = 0
        } else {
          t++
          let val = easeOutStrong(t, startValue, diffValue, d)
          callback(val)
          timer = requestAnimationFrame(move)
        }
      }
      /*
        t, 当前执行动画第几次
        b, 起始值
        c, 目标值-起始值
        d  动画执行总次数
        返回值： 当前次 元素应在在的一个位置
      */
      function easeOutStrong(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
      }
    }
  }
}
</script>

<style scoped >
.rebound {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid slateblue;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  user-select: none;
}
.page {
  position: absolute;
  top: 0;
  left: 0;
  /* transition: transform 1s; */
  margin: auto;
  width: 100%;
  height: 500px;
  background: skyblue;
  cursor: pointer;
  padding-left: 10px;
}
.innerSwiper {
  height: 200px;
  background: #787878;
}
</style>
