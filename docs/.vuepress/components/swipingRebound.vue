<template>
  <section>
    <!-- <p>手指/鼠标滑动速度：{{deltaY}}</p>
    <p>滚动距离：{{bufferDis}}</p>
    <p>滚动时间：{{time}}ms</p>
    <p>最大滚动高度：{{minHeight}}</p>
    <p>已滚动的高度：{{targer}}</p>-->
    <!-- <p>拉力系数：{{getF}}</p> -->
    <div class="page" ref="page">
      <div
        class="scroll"
        :style="{transform:`translate3d(0,${getDistanceY}px,0)`}"
        v-gesture:start="start"
        v-gesture:pressMove="pressMove"
        v-gesture:end="end"
        v-gesture:mouseLeave="end"
        ref="scroll"
        
      >
        <p
          class="p-item"
          v-for="item in data"
          :key="item"
          :style="{transform:`translate3d(0,${item===1?-getDistanceY:0}px,0)`}"
        >{{item}}</p>
      </div>
      <span
        class="scrollBar"
        :style="{height:`${scrollBarHeight}px`,transform:`translate3d(0,${scrollBarDis}px,0)`}"
      ></span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'swipingRebound',
  data() {
    return {
      data: [],
      distanceY: 0,
      leaveTime: 0,
      timer: null,
      deltaY: 0,
      time: 0,
      targer: 0,
      pageHeight: 0, //页面高度
      scrollHeight: 0
    }
  },
  computed: {
    //   最大滚动高度
    minHeight() {
      return this.pageHeight - this.scrollHeight
    },
    scale() {
      return this.pageHeight / this.scrollHeight
    },
    scrollBarDis() {
      return -this.getDistanceY * this.scale // 计算滚动条滚动的距离
    },
    scrollBarHeight() {
      return this.pageHeight * this.scale //计算滚动条高度
    },
    //缓冲距离
    bufferDis() {
      return Math.round(this.deltaY * 45)
    },
    getDistanceY() {
      if (this.distanceY > 0) {
        //顶部回弹
        return this.distanceY * this.getF
      } else if (this.distanceY < this.minHeight) {
        // 底部上拉距离距离
        let fDis = Math.abs(this.distanceY - this.minHeight)
        // 底部回弹
        return this.minHeight - fDis * this.getF
      } else {
        return this.distanceY
      }
    },
    // 计算拉力系数
    getF() {
      let distance = 0
      if (this.distanceY > 0) {
        distance = this.distanceY
      } else if (this.distanceY < this.minHeight) {
        distance = Math.abs(this.distanceY - this.minHeight) //底部超出距离
      }
      // 超出的越多，拉力系数越大 越难拉,F值越小
      let F = 1 - distance / this.pageHeight
      return F < 0.6 ? 0.6 : F
    }
  },
  mounted() {
    for (let i = 0, len = 150; i < len; i++) {
      this.data.push(i + 1)
    }
    this.$nextTick(() => {
      this.pageHeight = this.$refs.page.clientHeight
      this.scrollHeight = this.$refs.scroll.clientHeight
    })
  },
  methods: {
    start(evt) {
      if (Date.now() - this.leaveTime >= 150) {
        this.deltaY = 0
        cancelAnimationFrame(this.timer)
      }
    },
    pressMove(evt) {
      evt.preventDefault()
      //* 最后两点的距离越大，速度越大，位移出去的距离越大
      this.deltaY = evt.deltaY
      this.distanceY += evt.deltaY
      this.leaveTime = Date.now()
    },
    end(evt) {
      // 判断不在回弹范围中并且当用户手指抬起时 和 最后一次移动的时候，有比较大的一个时间间隔，可以认定 用户在抬起手指前有那么一段时间是按着不动的，那么也就不执行缓冲
      if (this.distanceY < 0 && this.distanceY + this.bufferDis < this.minHeight && Date.now() - this.leaveTime >= 150) {
        cancelAnimationFrame(this.timer)
        return
      }
      let time = Math.abs(this.bufferDis) < 800 && Math.abs(this.bufferDis) > 50 ? 800 : Math.round(Math.abs(this.bufferDis))
      if (time > 2000) {
        time = 2000
      }
      // 目标值=原始距离+缓冲距离
      let targer = Math.round(this.distanceY + this.bufferDis)
      // 过界处理
      if (targer >= 0) {
        // 防止滚动到顶部时缓冲距离过大，时间过长，导致缓慢滚动到顶部
        targer = 0
        time = 500
      } else if (targer < this.minHeight) {
        targer = this.minHeight
        // 防止滚动到底部时缓冲距离过大，时间过长，导致缓慢滚动到底部
        time = 500
      }
      this.targer = targer
      // 移动距离越远 时间就越长 正比关系
      this.time = time
      this.animation(
        this.distanceY,
        targer - this.distanceY,
        time,
        val => {
          this.distanceY = val
        },
        () => {}
      )
    },

    animation(startValue, diffValue, time, moveIng, success) {
      let d = Math.ceil(time / 16.7)
      let t = 0
      let move = () => {
        if (t > d || d == 0) {
          cancelAnimationFrame(this.timer)
          move = null
          t = 0
          success && success()
        } else {
          t++
          let val = easeOutStrong(t, startValue, diffValue, d)
          moveIng(val)
          this.timer = requestAnimationFrame(move)
        }
      }
      move()
      function easeOutStrong(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
      }
    }
  }
}
</script>

<style scoped >
p {
  margin: 0;
}
.page {
  margin: 0;
  padding: 0;
  width: 300px;
  height: 400px;
  border: 2px skyblue solid;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  position: relative;
}
.scrollBar {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  opacity: 1;
  transition: 0.3s opacity;
  right: 0;
  top: 0;
  width: 6px;
  height: 20px;
}
.p-item {
  border-top: 1px solid #eee;
  font-weight: bold;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>
