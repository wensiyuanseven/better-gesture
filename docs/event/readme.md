---
sidebarDepth: 2

---

# 支持的事件

## 自定义事件

### tap `点按`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

> 按下立即触发

``` html
<div v-gesture:tap="tap"> </div>
```

``` js
methods: {
  tap() {
    console.log('触发点按')
  }
}
```

### singleTap `单击`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

> 延迟250ms后触发

``` html
<div v-gesture:singleTap="singleTap"> </div>
```

``` js
methods: {
  singleTap() {
    console.log('触发单击')
  }
}
```

### longTap `长按`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

>长按750ms触发

``` html
<div v-gesture:longTap="longTap"> </div>
```

``` js
methods: {
  longTap() {
    console.log('触发长按')
  }
}
  ```

### doubleTap `双击`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

>双击间隔小于250ms触发

``` html
<div v-gesture:doubleTap="doubleTap"> </div>
```

``` js
methods: {
  doubleTap() {
    console.log('触发双击')
  }
}
```

**双击放大图片局部区域**

 <doubleTap ></doubleTap>

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

### pressMove `拖拽`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

- `event.deltaX` 最后两点坐标X轴差值
- `event.deltaY` 最后两点坐标Y轴差值
- `event.deltaTime` 最后两点时间差(ms)

``` html
<div v-gesture:pressMove="pressMove"> </div>
```

``` js
methods: {
  pressMove(event) {
    console.log(event.deltaX)
    console.log(event.deltaY)
    console.log(event.deltaTime)
  }
}
```

**拖拽+边界限制**

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

### swipe `滑动`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

> 滑动偏移量大于30触发

 `event.direction` 滑动方向 Left/Right/Up/Down

``` html
<div v-gesture:swipe="swipe"> </div>
```

``` js
methods: {
  swipe(event) {
    console.log(event.direction)
  }
}
```

**侧滑删除**

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

### rotate `双指旋转`  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

 `event.angle`  双指之间旋转的角度
   > 不支持PC端，请在移动端查看

``` html
<div v-gesture:rotate="rotate"> </div>
```

``` js
methods: {
  rotate(event) {
    console.log(event.angle)
  }
}
```

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

### pinch `双指缩放`  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

 `event.zoom`  双指之间缩放距离比值

  > 不支持PC端，请在移动端查看

``` html
<div v-gesture:pinch="pinch"> </div>
```

``` js
methods: {
  pinch(event) {
    console.log(event.zoom)
  }
}
```

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

### twoFingerPressMove `两根手指拖拽`  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

 ``` html
  <div v-gesture:twoFingerPressMove="twoFingerPressMove"> </div>
 ```

   ``` js
    methods: {
     twoFingerPressMove() {
         console.log('两根手指拖拽')
     }
   }
```

### moreFingerStart `多根手指触摸屏幕`  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

   ``` html
    <div v-gesture:moreFingerStart="moreFingerStart"> </div>
   ```

   ``` js
    methods: {
     moreFingerStart() {
         console.log('多根手指触摸屏幕')
     }
   }
```

### moreFingerEnd `手指离开`  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

>手指离开，屏幕只剩一个手指或零个手指触发

   ``` html
    <div v-gesture:moreFingerEnd="moreFingerEnd"> </div>
   ```

   ``` js
    methods: {
     moreFingerStart() {
         console.log('手指离开，屏幕只剩一个手指或零个手指触发')
     }
   }
```

### start `手指触摸屏幕或鼠标按下`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

``` html
<div v-gesture:start="start"> </div>
```

``` js
methods: {
  start() {
    console.log('手指触摸屏幕或鼠标按下触发')
  }
}
```

### end `手指抬起或鼠标释放`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

``` html
<div v-gesture:end="end"> </div>
```

``` js
methods: {
  end() {
    console.log('手指抬起或鼠标释放触发')
  }
}
```

## 移除单个事件

### Vue

 ``` html
<div v-gesture:tap="tap"  v-gesture:pressMove="pressMove"> </div>
```

  ``` js
  methods: {
    pressMove(event) {
      // 移除点按事件
        event.gesture.off('tap')
    },
    // 触发移除之后tap事件不再生效
    tap(){
      conso.log('tap')
    }
  }
  ```

### 原生JS

 ``` js
 let  betterGesture= new BetterGesture(document.getElementById('app'), {
        pressMove(event) {
            console.log(event.deltaX)
        }
    })
    // 移除
  betterGesture.off('pressMove')

  ```

### 小程序

``` html
<!-- wxml -->
<view class='container'>
    <view
      catch:touchstart="start"
      catch:touchmove="move"
      catch:touchend="end"
      catch:touchcancel="cancel">
    </view>
</view>
```

```js
// js
import BetterGesture from './../utils/better-gesture.js'
Page({
    onLoad() {
        new BetterGesture(this, {
            //拖拽
            pressMove(event) {
                console.log(event.deltaX, event.deltaY)
            },
            // 滑动
            swipe(event) {
              // 触发滑动事件之后移除拖拽事件
              event.gesture.off('pressMove')
            }
        })
    }
})
```

## 移除所有注册的事件

### Vue

> Vue在组件解销毁时会移除所有绑定的事件

**手动移除**

 ``` html
<div v-gesture:pressMove="pressMove"> </div>
```

  ``` js
  methods: {
    pressMove(event) {
      // 移除所有注册过的事件
        event.gesture.destroy()
    }
  }
  ```

  **`小程序`**

``` html
<!-- wxml -->
<view class='container'>
    <view
      catch:touchstart="start"
      catch:touchmove="move"
      catch:touchend="end"
      catch:touchcancel="cancel">
    </view>
</view>
```

```js
// js
import BetterGesture from './../utils/better-gesture.js'
Page({
    onLoad() {
        new BetterGesture(this, {
            //拖拽
            pressMove(event) {
                console.log(event.deltaX, event.deltaY)
            },
            // 滑动
            swipe(event) {
              // 触发滑动事件之后移除所有事件
              evt.gesture.destroy()
            }
        })
    }
})
```

### 原生JS

 ``` js
 let  betterGesture= new BetterGesture(document.getElementById('app'), {
        pressMove(e) {
            console.log(event.deltaX)
        }
    })
    // 移除所有事件
  betterGesture.destroy()

  ```

## 动态绑定事件

### Vue

```html
<template>
  <section  v-gesture:tap="tap">点按</section>
</template>
```

```js
<script>
export default {
  methods: {
    tap(event) {
      // 动态绑定拖拽事件
      event.gesture.on('pressMove', this.pressMove)
    },
    pressMove(event) {
        console.log(event,'我是动态绑定的事件')
    }
  }
}
</script>
```

### 小程序

``` html
<!-- wxml -->
<view class='container'>
    <view
      catch:touchstart="start"
      catch:touchmove="move"
      catch:touchend="end"
      catch:touchcancel="cancel">
    </view>
</view>
```

```js
// js
import BetterGesture from './../utils/better-gesture.js'
Page({
    onLoad() {
        new BetterGesture(this, {
            // 滑动
            swipe(event) {
              // 动态绑定pressMove事件
             event.gesture.on('pressMove', this.pressMove)
            }
        })
    },
    //
    pressMove(event){
      console.log(event,'我是动态绑定的事件')
    }
})
```

### 原生JS

``` js
let  betterGesture= new BetterGesture(document.getElementById('app'))
let pressMove = function(event) {
    console.log(event,'我是动态绑定的事件')
}
//动态绑定事件
betterGesture.on('pressMove')
```

## 支持驼峰或短横线分隔

 ``` html
<div v-gesture:pressMove="pressMove"> </div>
     <!-- or -->
<div v-gesture:touch-move="pressMove"> </div>
```

  ``` js
  methods: {
    pressMove() {
        console.log('pressMove')
    }
  }
  ```

## 支持以下原生事件

### `touchStart`   <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

### `touchMove`  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

### `touchEnd`  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

### `touchCancel`  <Badge vertical="middle" text="Mobile"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

### `mouseDown`  <Badge vertical="middle" text="PC"/>

### `mouseMove`  <Badge vertical="middle" text="PC"/>

### `mouseUp`  <Badge vertical="middle" text="PC"/>

### `mouseOver`  <Badge vertical="middle" text="PC"/>

### `mouseOut`  <Badge vertical="middle" text="PC"/>

> 注意:请使用驼峰或短横线注册原生事件,否则不生效

 ``` html
<div v-gesture:touchStart="touchStart"> </div>
 <!-- or -->
<div v-gesture:touch-start="touchStart"> </div>
```

   ``` js
  methods: {
     touchStart() {
         console.log('touchStart')
     }
  }
```
