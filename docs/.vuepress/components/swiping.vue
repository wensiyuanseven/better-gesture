<template>
  <section>
    <p>手指/鼠标滑动速度：{{deltaY}}</p>
    <p>滚动距离：{{bufferDis}}</p>
    <p>滚动时间：{{time}}ms</p>
    <p>最大能滚动高度：{{minHeight}}</p>
    <p>已滚动的高度：{{targer}}</p>
    <div class="page" ref="page">
      <div
        class="scroll"
        :style="{transform:`translate3d(0,${distanceY}px,0)`}"
        v-gesture:start="start"
        v-gesture:pressMove="pressMove"
        v-gesture:end="end"
        ref="scroll"
      >
        <p class="p-item" v-for="item in data" :key="item">{{item}}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'swiping',
  data() {
    return {
      data: [],
      distanceY: 0,
      minHeight: 0,
      leaveTime: 0,
      timer: null,
      deltaY: 0,
      time: 0,
      targer: 0
    }
  },
  computed: {
    //速度
    bufferDis() {
      return Math.round(this.deltaY * 45)
    }
  },
  mounted() {
    for (let i = 0, len = 200; i < len; i++) {
      this.data.push(i + 1)
    }
    this.$nextTick(() => {
      this.minHeight = this.$refs.page.clientHeight - this.$refs.scroll.clientHeight
    })
  },
  methods: {
    start(evt) {
      if (Date.now() - this.leaveTime >= 500) {
        cancelAnimationFrame(this.timer)
      }
    },
    pressMove(evt) {
      evt.preventDefault()
      let distanceY = this.distanceY + evt.deltaY
      if (distanceY >= 0) {
        distanceY = 0
      } else if (distanceY < this.minHeight) {
        distanceY = this.minHeight
      }
      /* 最后两点的距离越大，速度越大，位移出去的距离越大 */
      this.deltaY = evt.deltaY
      this.distanceY = distanceY
      this.leaveTime = Date.now()
    },
    end(evt) {
      if (Date.now() - this.leaveTime >= 100) {
        // 判断当用户手指抬起时 和 最后一次移动的时候，有比较大的一个时间间隔，可以认定 用户在抬起手指前有那么一段时间是按着不动的，那么也就不执行缓冲
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
      this.animation(this.distanceY, targer - this.distanceY, time, val => {
        this.distanceY = val
      })
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
}
.p-item {
  border-top: 1px solid #eee;
  font-weight: bold;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>
