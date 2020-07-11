<template>
  <div class="rebound-wrap">
    <div class="rebound" @scroll="scrolll" ref="wrap">
      <div
        class="page"
        v-gesture:start="start"
        v-gesture:pressMove="pressMove"
        v-gesture:end="end"
        v-gesture:mouseLeave="end"
        :style="{transform:`translate3d(0,${getDistance}px,0)`}"
        ref="page"
      >
        <div>
          <p class="item" v-for="item in 10">{{item}}</p>
        </div>
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
      currentY: 0,
      overDistance: 0,
      text: '上拉加载',
      point: 150,
      data: [],
      scrollBottom: false,
      scrollTop: 0,
      top: 0,
      abc: 0,
      maxScrollTop: 0
    }
  },
  computed: {
    getDistance() {
      return this.distanceY * 0.4
    }
  },
  mounted() {
    this.maxScrollTop = this.$refs.wrap.scrollHeight - this.$refs.wrap.clientHeight
  },
  methods: {
    start(evt) {
      this.startY = evt.clientY || evt.touches[0].clientY
    },
    scrolll(event) {
      this.top = this.$refs.wrap.scrollTop + this.$refs.wrap.clientHeight
      this.scrollBottom = this.$refs.page.offsetHeight === parseInt(this.$refs.wrap.scrollTop) + parseInt(this.$refs.wrap.offsetHeight) - 2
    },
    pressMove(evt) {
      this.currentY = evt.clientY || evt.touches[0].clientY
      if (this.$refs.wrap.scrollTop + this.$refs.wrap.clientHeight >= this.$refs.wrap.scrollHeight && this.currentY - this.startY < 0) {
        // 滚动的距离是 83 直接变成 0
        this.abc = this.$refs.wrap.scrollTop
        evt.preventDefault()
        evt.stopPropagation()
        //  加上原来的距离&&去掉
        // 往下移动肯定要把滚动的距离减掉
        this.distanceY += Math.round(evt.deltaY) - this.$refs.wrap.scrollTop
      }
    },
    end(evt) {
      if (this.distanceY < 0) {
        this.animation(
          this.getDistance,
          -this.maxScrollTop - this.getDistance,
          val => {
            this.distanceY = Math.round(val) / 0.4
          },
          () => {
            // 运动完成之后重置translate 让滚动条滚动到底部
            // this.distanceY = 0
            this.$nextTick(() => {
              this.$refs.wrap.scrollTop = this.maxScrollTop
            })
          }
        )
      }
    },
    animation(startValue, diffValue, moveIng, success) {
      let d = Math.ceil(500 / 16.7)
      let timer = null
      let t = 0
      move()
      function move() {
        if (t > d || d == 0) {
          cancelAnimationFrame(timer)
          t = 0
          success && success()
        } else {
          t++
          let val = easeOutStrong(t, startValue, diffValue, d)
          moveIng(val)
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
.rebound-wrap p {
  margin: 0;
}
.refresh {
  margin-top: -22px;
  text-align: center;
}
.rebound {
  position: relative;
  width: 300px;
  height: 400px;
  border: 2px solid skyblue;
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  user-select: none;
}
.page {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  /* transition: transform 1s; */
  margin: auto;
  width: 100%;
  cursor: pointer;
  padding-left:0px;
}
.innerSwiper {
  height: 200px;
  background: #787878;
}
.item {
  margin: 0;
  line-height: 50px;
  height: 50px;
  text-align: center;
  font-weight: bold;
   border-bottom: 1px solid #eee;
}
</style>