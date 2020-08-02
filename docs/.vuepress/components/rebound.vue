<template>
  <div class="rebound-wrap">
    <p>move:{{getDistanceY}}</p>
    <p>scrollTop: {{scrollTop}}</p>
    <div class="rebound" @scroll="scrolll" ref="wrap">
      <div
        class="page"
        v-gesture:start="start"
        v-gesture:pressMove="pressMove"
        v-gesture:end="end"
        v-gesture:mouseLeave="end"
        :style="{transform:`translate3d(0,${getDistanceY}px,0)`}"
      >
        <div class="refresh">{{text}}</div>
        <p class="item" v-for="(item,index) in data">{{item}}</p>
        <p class="item" v-for="(item,index) in 7">{{item}}</p>
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
      text: '下拉刷新',
      point: 150,
      data: []
    }
  },
  computed: {
    getDistanceY() {
      return this.distanceY * 0.4
    }
  },
  methods: {
    start(evt) {
      this.startY = evt.clientY || evt.touches[0].clientY
    },
    scrolll(event) {
      this.scrollTop = this.$refs.wrap.scrollTop
    },
    pressMove(evt) {
      evt.stopPropagation()
      this.currentY = evt.clientY || evt.touches[0].clientY
      //  滚动到顶部，并且是下拉手势
      if (this.scrollTop === 0 && this.currentY - this.startY > 0) {
        evt.preventDefault()
        //超出的距离
        this.distanceY += Math.round(evt.deltaY)
        if (this.distanceY > this.point) {
          this.text = '松开刷新'
        } else {
          this.text = '下拉刷新'
        }
      }
    },
    end(evt) {
      if (this.distanceY > 0) {
        // 当下拉到达临界点
        if (this.distanceY >= this.point) {
          this.text = '更新中...'
          this.animation(
            this.distanceY,
            this.point - this.distanceY,
            val => {
              this.distanceY = Math.round(val)
            },
            () => {
              setTimeout(() => {
                this.data.unshift(Math.floor(Math.random() * 10))
                this.text = '更新完成...'
                this.animation(this.distanceY, 0 - this.distanceY, val => {
                  this.distanceY = Math.round(val)
                })
              }, 1000)
            }
          )
        } else {
          this.animation(this.distanceY, 0 - this.distanceY, val => {
            this.distanceY = Math.round(val)
          })
        }
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
  border: skyblue 2px solid;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  user-select: none;
}
.page {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
  width: 100%;
  cursor: pointer;
  padding-left: 10px;
  background: aliceblue;
}

.item {
  text-align: center;
  font-weight: bold;
  line-height: 50px;
  height: 50px;
}
</style>
