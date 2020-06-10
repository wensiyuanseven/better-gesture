# 用法

## vue

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
  }
}
</script>
```

## 小程序  todo

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
    })
</script>
```
