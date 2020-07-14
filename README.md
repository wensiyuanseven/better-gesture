# better-gesture

 ![minzip](https://img.shields.io/bundlephobia/minzip/better-gesture) ![version](https://img.shields.io/github/package-json/v/wensiyuanseven/better-gesture) ![last commit](https://img.shields.io/github/last-commit/wensiyuanseven/better-gesture)  ![issues](https://img.shields.io/github/issues/wensiyuanseven/better-gesture)

## 介绍

### 方便、轻量,可用于PC,Mobile, Vue,小程序的多端手势库

- **支持多端：PC,Mobile,小程序,Vue**
- **极小的文件大小,无需安装任何依赖，压缩后代码仅有**<Badge vertical="middle" text="3.6KB"/>
- **简洁的API设计**
- **优秀的性能**
- **丰富的手势事件,支持canvas手势监听**
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
<script src='https://unpkg.com/better-gesture@0.1.6/lib/better-gesture.umd.min.js'></script>
```

## 用法

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
    pressMove(e) {
      console.log(e.deltaX)
      console.log(e.deltaY)
    },
    // 双击
    doubleTap() {
      console.log('双击')
    }
    //......
  }
}
</script>
```

## 在小程序中使用  todo

## 直接script引入

``` html
<script src='https://unpkg.com/better-gesture/lib/better-gesture.umd.min.js'></script>
```

``` html
<div id="example"></div>

<script>
    new BetterGesture(document.getElementById('example'), {
        // 拖拽
        pressMove(e) {
            console.log(e.deltaX)
            console.log(e.deltaY)
        },
        // 双击
        doubleTap() {
            console.log('双击')
        }
        //......
    })
</script>
```

更多用法请查看  <https://wensiyuanseven.github.io/better-gesture/>
