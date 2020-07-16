---
sidebarDepth: 2

---

# 常见案例

## 双指旋转

 > 不支持PC端，请在移动端查看

 <rotate></rotate>
 ::: details 点击查看代码

``` html
<template>
  <section class="rotatewrap">
    <p>angle:{{angle}}</p>
    <div
      class="rotate"
      v-gesture:moreFingerStart="moreFingerStart"
      v-gesture:rotate="rotate"
      :style="{ transform:`rotate(${angle}deg)`}"
    >双指旋转</div>
  </section>
</template>

<script>
let initRotate = 1
export default {
  name: 'rotate',
  data() {
    return {
      angle: 15
    }
  },
  methods: {
    // 一根以上手指触发
    moreFingerStart() {
      initRotate = this.angle
    },
    rotate(evt) {
      this.angle = initRotate += evt.angle
    }
  }
}
</script>

<style scoped >
.rotate {
  margin-top: 20px;
  width: 100px;
  height: 100px;
  background: skyblue;
  user-select: none;
  line-height: 100px;
  text-align: center;
}
</style>
```

:::

  > 不支持PC端，请在移动端查看

## 双指缩放

<pinch></pinch>

::: details 点击查看代码

``` html
<template>
  <section class="pinchwrap">
    <p>zoom:{{scale}}</p>
    <div
      class="pinch"
      v-gesture:moreFingerStart="moreFingerStart"
      v-gesture:pinch="pinch"
      :style="{transform:`scale3d(${scale},${scale},1)`}"
    >双指缩放</div>
  </section>
</template>

<script>
let initScale = 1
export default {
  name: 'pinch',
  data() {
    return {
      scale: 1
    }
  },
  methods: {
    // 一根以上手指触发
    moreFingerStart() {
      initScale = this.scale
    },
    pinch(evt) {
      this.scale = initScale * evt.zoom
    }
  }
}
</script>

<style scoped >
.pinch {
  margin-top: 20px;
  width: 100px;
  height: 100px;
  background: skyblue;
  user-select: none;
  line-height: 100px;
  text-align: center;
}
</style>
```

:::

## 下拉刷新

 <rebound></rebound>

::: details 点击查看代码

``` html
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
        <p class="item" v-for="(item,index) in 20">{{item}}</p>
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
  background: seashell;
}

.item {
  text-align: center;
  font-weight: bold;
  line-height: 50px;
  height: 50px;
}
</style>

```

:::

## 上拉加载

<pullUp></pullUp>

::: details 点击查看代码

``` html
<template>
  <div>
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
            <p class="item" v-for="(item,index) in data" :key="index">{{index+1}}</p>
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
  height: 400px;
  overflow: scroll;
  cursor: pointer;
  border: skyblue 2px solid;
}
.app p {
  margin: 0;
}
.wrap {
  overflow: hidden;
}
.content {
  background: aliceblue;
}

.move {
  box-sizing: border-box;
  user-select: none;
  text-align: center;
}

.text {
  margin-bottom: -50px;
  line-height: 50px;
  height: 50px;
}

.item {
  text-align: center;
  font-weight: bold;
  line-height: 50px;
  height: 50px;
}
</style>
```

:::

## 双击放大图片局部区域

<doubleTap></doubleTap>

::: details 点击查看代码

``` html
<template>
  <section class="double-tap">
    <img
      src="./../public/demo.jpg"
      :style="{transform:`translate3d(${distanceX}px,${distanceY}px,0) scale3d(${scaleX},${scaleY},1)`}"
      class="img-demo"
      ref="imgDemo"
      v-gesture:doubleTap="doubleTap"
    />
  </section>
</template>

<script>
export default {
  name: 'doubleTap',
  data() {
    return {
      distanceX: 0,
      distanceY: 0,
      scaleX: 1,
      scaleY: 1
    }
  },
  methods: {
    // 双击
    doubleTap(evt) {
      if (this.scaleX > 1.5) {
        this.scaleX = this.scaleY = 1
        this.distanceX = this.distanceY = 0
      } else {
        let box = this.$refs.imgDemo.getBoundingClientRect()
        let xDis = 0
        let yDis = 0
        // pc
        if (evt.clientX) {
          xDis = evt.clientX - box.left
          yDis = evt.clientY - box.top
        } else {
          // mobile
          xDis = evt.changedTouches[0].clientX - box.left
          yDis = evt.changedTouches[0].clientY - box.top
        }
        //移动的距离=触摸点到图片中心点的距离
        let x = box.width - box.width / 2 - xDis
        let y = box.height - box.height / 2 - yDis
        this.scaleX = this.scaleY = 2
        this.distanceX = x
        this.distanceY = y
      }
    }
  }
}
</script>

<style scoped >
.double-tap {
  height: 300px;
  width: 350px;
  display: flex;
  overflow: hidden;
}
.img-demo {
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  margin: auto;
  cursor: pointer;
}
</style>
```

:::

## 拖拽+边界限制

<pressMove></pressMove>

::: details 点击查看代码

``` html
<template>
  <div class="press-move">
    <p>deltaX:{{deltaX}}</p>
    <p>deltaY:{{deltaY}}</p>
    <p>deltaTime:{{deltaTime}}ms</p>
    <section class="wrap">
      <div
        class="drag"
        v-gesture:pressMove="pressMove"
        :style="{transform:`translate3d(${distanceX}px,${distanceY}px,0)`}"
      ></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'pressMove',
  data() {
    return {
      distanceX: 0,
      distanceY: 0,
      deltaX: 0,
      deltaY: 0,
      deltaTime: 0
    }
  },
  methods: {
    pressMove(evt, abc) {
      evt.preventDefault()
      this.deltaX = evt.deltaX
      this.deltaY = evt.deltaY
      this.deltaTime = evt.deltaTime
      let distanceX = this.distanceX + evt.deltaX
      let distanceY = this.distanceY + evt.deltaY
      //边界限制
      if (distanceY < -100) {
        distanceY = -100
      } else if (distanceY > 100) {
        distanceY = 100
      }
      if (distanceX < -100) {
        distanceX = -100
      } else if (distanceX > 100) {
        distanceX = 100
      }
      this.distanceX = distanceX
      this.distanceY = distanceY
    }
  }
}
</script>

<style scoped >
.press-move p {
  margin: 0;
}
.wrap {
  width: 300px;
  height: 300px;
  border: 1px solid skyblue;
  display: flex;
}
.drag {
  margin: auto;
  width: 100px;
  height: 100px;
  background: skyblue;
  cursor: pointer;
}
</style>
```

:::

## 自定义划屏

### 竖向划屏+边界回弹

<swipingRebound></swipingRebound>
::: details 点击查看代码

``` html
<template>
  <section>
    <p>拉力系数：{{getF}}</p>
    <p>滚动速度：{{deltaY}}</p>
    <p>滚动距离：{{bufferDis}}</p>
    <p>滚动时间：{{time}}ms</p>
    <p>最大滚动高度：{{-minHeight}}</p>
    <p>已滚动的高度：{{-targer}}</p>
    <div class="page" ref="page">
      <div
        class="scroll"
        :style="{transform:`translate3d(0,${getDistanceY}px,0)`}"
        v-gesture:start="start"
        v-gesture:pressMove="pressMove"
        v-gesture:end="end"
        ref="scroll"
      >
        <p
          class="p-item"
          v-for="item in data"
          :key="item"
          :class="{fixed:item===1}"
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
    console.log(this, '---', this.data)
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
.fixed {
  background: skyblue;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
```

:::

### 竖向划屏+边界限制

<swiping></swiping>

::: details 点击查看代码

``` html
<template>
  <section>
    <p>滚动速度：{{deltaY}}</p>
    <p>滚动距离：{{bufferDis}}</p>
    <p>滚动时间：{{time}}ms</p>
    <p>最大能滚动高度：{{-Math.abs(minHeight)}}</p>
    <p>已滚动的高度：{{-targer}}</p>
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
```

:::

## 轮播

### 无缝触摸轮播 方案-1

<swiper></swiper>

::: details 点击查看代码

```html
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
      v-gesture:mouseOut="handelBound"
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
      this.handelBound()
      // 开启定时器
      this.interval()
    },
    handelBound() {
      // 计算停留在第几张
      let currentIndex = this.currentIndex
      this.transition = true
      this.translateX = -currentIndex * this.swiperWidth
      this.index = currentIndex
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
```

:::

### 无缝触摸轮播 方案-2

<swiperTwo></swiperTwo>

::: details 点击查看代码

``` html
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
```

:::
<!-- <swipingRebound><swipingRebound> -->
<!-- ## 广告位轮播

<adSwiper></adSwiper> -->

### 横向

<adSwipeTwo></adSwipeTwo>

::: details 点击查看代码

``` html
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

```

:::

### 竖向

<adSwiper></adSwiper>

::: details 点击查看代码

``` html
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
  border: 2px solid sienna;
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

```

:::

## 侧滑删除

<slidingDelete></slidingDelete>

::: details 点击查看代码

``` html
<template>
  <section class="app" v-gesture:swipe="swipe">
    <div :style="{transform:`translate3d(${distance}px,0,0)`}" class="wrap">
      <div class="content">侧滑删除</div>
      <div class="delete">删除</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'slidingDelete',
  data() {
    return {
      distance: 0
    }
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    swipe(evt) {
      this.distance = evt.direction === 'Left' ? -50 : 0
    }
  }
}
</script>

<style scoped >
.app {
  width: 300px;
  height: 70px;
  overflow: hidden;
  cursor: move;
  user-select: none;
}
.wrap {
  transition: transform 0.3s;
  display: flex;
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  background: skyblue;
  line-height: 70px;
  text-align: center;
}
.delete {
  height: 100%;
  width: 50px;
  margin-right: -50px;
  line-height: 70px;
  text-align: center;
  background: chocolate;
}
</style>
```

:::

## 无限加载

<loadMore></loadMore>

::: details 点击查看代码

``` html
<template>
  <section class="loadMore" @scroll="scroll" ref="scroll">
    <p class="item" v-for="(item,index) in data" :key="index">{{index+1}}</p>
    <p class="loadtext">{{text}}</p>
  </section>
</template>

<script>
export default {
  name: 'loadMore',
  data() {
    return {
      data: [],
      point: 100, //触底临界点
      laod: true,
      indexLoad: 1,
      text: '加载中...'
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    //TODO 设置截流
    scroll() {
      if (this.load && this.$refs.scroll.scrollTop + this.$refs.scroll.clientHeight >= this.$refs.scroll.scrollHeight - this.point) {
        this.getList()
      }
    },
    getList() {
      this.load = false
      if (this.indexLoad > 6) {
        this.load = false
        this.text = '加载完成'
        return
      }
      setTimeout(() => {
        this.indexLoad++
        for (let i = 0; i < 20; i++) {
          this.data.push(i)
        }
        this.load = true
      }, 1000)
    }
  }
}
</script>

<style scoped >
.loadMore {
  height: 400px;
  width: 300px;
  border: 2px skyblue solid;
  overflow: scroll;
  text-align: center;
  font-weight: bold;
}
.loadtext {
  height: 50px;
  line-height: 50px;
  margin: 0;
}
.item {
  border-bottom: 1px solid #eee;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 0;
}
</style>
```

:::

## 上拉底部回弹

<bottomRebound></bottomRebound>

::: details 点击查看代码

``` html
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
```

:::
