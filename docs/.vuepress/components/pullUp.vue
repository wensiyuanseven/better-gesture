<template>
  <div>
    {{maxScrollTop}}
    <div class="app" ref="app">
      <div class="wrap">
        <div
          class="move"
          v-gesture:start="start"
          v-gesture:pressMove="pressMove"
          v-gesture:end="end"
          v-gesture:mouseLeave="end"
          :style="{transform:`translate3d(0,${getDistance}px,0)`}"
        >
          <div class="content">
            <p v-for="(item,index) in data" :key="index">{{index+1}}</p>
          </div>
          <div class="text">{{text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      distanceY: 0,
      scrollTop: 0,
      startY: 0,
      currentY: 0,
      scrollBottom: false,
      point: 50, //临界点
      data: [],
      maxScrollTop: 0
    }
  },
  computed: {
    getDistance() {
      return this.distanceY * 0.4
    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    getList() {
      for (let i = 0; i < 20; i++) {
        this.data.push(i)
      }
    },
    start(evt) {
      this.startY = evt.clientY || evt.touches[0].clientY
      this.maxScrollTop = this.$refs.app.scrollHeight - this.$refs.app.clientHeight
    },
    pressMove(evt) {
      this.currentY = evt.clientY || evt.touches[0].clientY
      if (this.$refs.app.scrollTop + this.$refs.app.clientHeight >= this.$refs.app.scrollHeight && this.currentY - this.startY < 0) {
        evt.preventDefault()
        evt.stopPropagation()
        if (Math.abs(this.getDistance) >= this.point) {
          this.text = '释放加载'
        } else {
          this.text = '上拉加载更多'
        }
        this.distanceY += Math.round(evt.deltaY)
      }
    },
    end(evt) {
      if (this.distanceY < 0) {
        if (Math.abs(this.getDistance) >= this.point) {
          this.text = '加载中...'
          this.animation(
            this.getDistance,
            -this.point - this.getDistance,
            val => {
              this.distanceY = Math.round(val) / 0.4
            },
            () => {
              setTimeout(() => {
                this.getList()

                this.text = '加载成功'
                this.$nextTick(() => {
                  this.distanceY = 0
                  this.$refs.app.scrollTop = this.maxScrollTop + this.point
                })
                // this.animation(-this.point, this.point, val => {
                //   this.distanceY = Math.round(val) / 0.4
                // })
              }, 1000)
            }
          )
        } else {
          this.animation(this.getDistance, -this.getDistance, val => {
            this.distanceY = Math.round(val) / 0.4
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
      function easeOutStrong(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b
      }
    }
  }
}
</script>

<style scoped >
.app {
  width: 300px;
  height: 300px;
  overflow: scroll;
  cursor: pointer;
  border: 1px solid skyblue;
}
.app p {
  margin: 0;
}
.wrap {
  overflow: hidden;
}
.content {
  background: sienna;
}

.move {
  box-sizing: border-box;
  background: skyblue;
  border: 1px solid slateblue;
  user-select: none;
  text-align: center;
}
.scroll {
  /* overflow-y: scroll; */
  border: 1px solid salmon;
}

.text {
  margin-bottom: -50px;
  line-height: 50px;
  height: 50px;
}
</style>
