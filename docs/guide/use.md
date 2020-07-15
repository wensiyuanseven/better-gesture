# 用法

## 直接script引入

``` html
<script src='https://unpkg.com/better-gesture/lib/better-gesture.umd.min.js'></script>
```

``` html
<div id="example"></div>

<script>
  new BetterGesture(document.getElementById('example'), {
      //拖拽
      pressMove(evt) {
          console.log(evt.deltaX, evt.deltaY)
      },
      // 旋转
      rotate(evt) {
          console.log(evt.angle)
      },
      // 缩放
      pinch(evt) {
          console.log(evt.zoom)
      },
      // 滑动
      swipe(evt) {
          console.log(evt.direction)
      }
      //......
  })
</script>
```

## 在vue中使用

```js
import Vue from 'vue'
import gesture from 'better-gesture'

Vue.use(gesture)
```

```js
<template>
  <section class="example">
    <div v-gesture:pressMove="pressMove" v-gesture:doubleTap="doubleTap"> </div>
  </section>
</template>

<script>
export default {
  methods: {
     //拖拽
      pressMove(evt) {
          console.log(evt.deltaX, evt.deltaY)
      },
      // 旋转
      rotate(evt) {
          console.log(evt.angle)
      },
      // 缩放
      pinch(evt) {
          console.log(evt.zoom)
      },
      // 滑动
      swipe(evt) {
          console.log(evt.direction)
      }
      //......
  }
}
</script>

```

## 在小程序中使用

> 建议使用catch捕获事件，否则易造成监听动画卡顿

``` html
<!-- wxml -->
<!-- 必须初始化事件touchstart,touchmove,touchend,touchcancel-->
<!-- 事件名必须定义为start,move，end,cancel -->
<!-- 事件名start,move，end,cancel已经在new BetterGesture()时注入过了,不需要在page中再次定义-->
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
            pressMove(evt) {
                console.log(evt.deltaX, evt.deltaY)
            },
            // 旋转
            rotate(evt) {
                console.log(evt.angle)
            },
            // 缩放
            pinch(evt) {
                console.log(evt.zoom)
            },
            // 滑动
            swipe(evt) {
                console.log(evt.direction)
            }
            //......
        })
    }
})
```

小程序代码片段:  <https://developers.weixin.qq.com/s/zMnroRmF7fiT>
