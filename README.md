# better-gesture

 ![minzip](https://img.shields.io/bundlephobia/minzip/better-gesture) ![version](https://img.shields.io/github/package-json/v/wensiyuanseven/better-gesture) ![last commit](https://img.shields.io/github/last-commit/wensiyuanseven/better-gesture)  ![issues](https://img.shields.io/github/issues/wensiyuanseven/better-gesture)

 English | [中文](https://github.com/wensiyuanseven/better-gesture/blob/master/README_zh-CN.md) | [Demo](https://wensiyuanseven.github.io/better-gesture/demo) |  [Link](https://juejin.cn/post/6844904166700089351#heading-14)

## A gesture library use for pc, mobile, vue, and mini programs

- **Support multiple terminals: PC, Mobile, Vue, applet**
- **Very small file size, no need to install any dependencies, the compressed code is only`3.77KB`**
- **Good documentation support**
- **Simple API design**
- **Excellent performance**
- **Rich gesture events：doubleTap longTap pressMove rotate pinch swipe ...**
- **Support dynamic destruction, create gesture event**

## Install

### NPM

``` sh
npm install better-gesture
```

### CDN

Able to pass [unpkg.com/](https://unpkg.com/)get the latest version of resources，introduce the `js` file on the page to start using it.

``` html
<!-- latest version of -->
<script src='https://unpkg.com/better-gesture/lib/better-gesture.umd.min.js'></script>

<!-- specify version -->
<script src='https://unpkg.com/better-gesture@0.2.4/lib/better-gesture.umd.min.js'></script>
```

## Use

### use in script

``` html
<script src='https://unpkg.com/better-gesture/lib/better-gesture.umd.min.js'></script>
```

``` html
<div id="example"></div>

<script>
  new BetterGesture(document.getElementById('example'), {
      pressMove(evt) {
          console.log(evt.deltaX, evt.deltaY)
      },
      rotate(evt) {
          console.log(evt.angle)
      },
      pinch(evt) {
          console.log(evt.zoom)
      },
      swipe(evt) {
          console.log(evt.direction)
      }
      //......
  })
</script>
```

### use in vue

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
      pressMove(evt) {
          console.log(evt.deltaX, evt.deltaY)
      },
      rotate(evt) {
          console.log(evt.angle)
      },
      pinch(evt) {
          console.log(evt.zoom)
      },
      swipe(evt) {
          console.log(evt.direction)
      }
      //......
  }
}
</script>

```

### use in mini programs

> npm build introduction

Execute the command to install the NPM package in the directory where the small package.json program is located

 ``` sh
npm install better-gesture
```
>
Click on the Developer Tools menu bar: Tools -- Build NPM

**Or a CDN download is introduced**

[click to download](https://unpkg.com/better-gesture/lib/better-gesture.umd.min.js)

```js
// npm build introduction
import BetterGesture from './../miniprogram_npm/better-gesture/better-gesture.umd.min.js'

// cdn download and introduction
import BetterGesture from './../utils/better-gesture.js'
```

**Use**

> It is recommended to use catch to capture the event, otherwise it will easily cause the monitoring animation to freeze

``` html
<!-- wxml -->
<!-- Must initialize event touchstart,touchmove,touchend,touchcancel-->
<!-- The function name must be defined as start,move，end,cancel -->

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
import BetterGesture from './../utils/better-gesture.js'
Page({
    onLoad() {
        new BetterGesture(this, {
            pressMove(evt) {
                console.log(evt.deltaX, evt.deltaY)
            },
            rotate(evt) {
                console.log(evt.angle)
            },
            pinch(evt) {
                console.log(evt.zoom)
            },
            swipe(evt) {
                console.log(evt.direction)
            }
            //......
        })
    }
})
```

Mini programs code snippets: [Click to view](https://developers.weixin.qq.com/s/vAQ2mRmd7wj9)

More usage: <https://wensiyuanseven.github.io/better-gesture>
