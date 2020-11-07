# better-gesture

 ![minzip](https://img.shields.io/bundlephobia/minzip/better-gesture) ![version](https://img.shields.io/github/package-json/v/wensiyuanseven/better-gesture) ![last commit](https://img.shields.io/github/last-commit/wensiyuanseven/better-gesture)  ![issues](https://img.shields.io/github/issues/wensiyuanseven/better-gesture)

## 文档: <https://wensiyuanseven.github.io/better-gesture>

## 介绍

### 方便、轻量,可用于PC,Mobile, Vue,小程序的多端手势库

- **支持多端：PC,Mobile,Vue,小程序**
- **极小的文件大小,无需安装任何依赖，压缩后代码仅`3.77KB`**
- **良好的文档支持**
- **简洁的API设计**
- **优秀的性能**
- **丰富的手势事件：doubleTap longTap pressMove rotate pinch swipe ...**
- **支持动态销毁,创建手势事件**

## 安装

## NPM

``` sh
npm install better-gesture
```

## CDN

目前可以通过 [unpkg.com/](https://unpkg.com/)获取到最新版本的资源，在页面上引入`js`文件即可开始使用。

``` html
<!-- 最新版本 -->
<script src='https://unpkg.com/better-gesture/lib/better-gesture.umd.min.js'></script>

<!-- 指定版本 -->
<script src='https://unpkg.com/better-gesture@0.2.4/lib/better-gesture.umd.min.js'></script>
```

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

**npm构建引入**

在小程序 package.json 所在的目录中执行命令安装 npm 包

 ``` sh
npm install better-gesture
```
>
点击开发者工具中的菜单栏：工具 --> 构建 npm

**或者CDN下载引入**

[点击下载](https://unpkg.com/better-gesture/lib/better-gesture.umd.min.js)

```js
// npm构建引入
import BetterGesture from './../miniprogram_npm/better-gesture/better-gesture.umd.min.js'

// cdn下载引入
import BetterGesture from './../utils/better-gesture.js'
```

**使用**

> 建议使用catch捕获事件，否则易造成监听动画卡顿

``` html
<!-- wxml -->
<!-- 必须初始化事件touchstart,touchmove,touchend,touchcancel-->
<!-- 函数名必须定义为start,move，end,cancel -->
<!-- 函数start,move，end,cancel已经在new BetterGesture()时注入到了Page中,不需要在Page中再次定义-->
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

 小程序代码片段: [点击查看](https://developers.weixin.qq.com/s/vAQ2mRmd7wj9)

 更多用法: <https://wensiyuanseven.github.io/better-gesture>
