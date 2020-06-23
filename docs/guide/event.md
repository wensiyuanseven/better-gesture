---
sidebarDepth: 2
---

# 支持的事件

## 自定义事件

### tap `点按`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobel"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

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

### longTap `长按`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobel"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

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

**案例：长按改变背景颜色**

 <longTap ></longTap>

::: details 点击查看代码

``` html
<div v-gesture:longTap="longTap"  :style="{background:randomColor}">长按</div>
```

``` js
export default {
  data() {
    return {
      randomColor: 'silver'
    }
  },
  methods: {
    longTap() {
      this.randomColor ='#'+(Math.random()*0xffffff<<0).toString(16)
    }
  }
}
```

:::

### doubleTap `双击`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobel"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

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

**案例：双击放大图片局部区域**

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

### pressMove `拖拽`  <Badge vertical="middle" text="PC"/>  <Badge vertical="middle" text="Mobel"/>  <Badge vertical="middle" text="Vue"/>   <Badge vertical="middle" text="小程序"/>

<pressMove></pressMove>

**案例：下拉刷新**

<rebound></rebound>

**案例：上拉加载**

<pullUp></pullUp>

**案例：侧滑删除**

<slidingDelete></slidingDelete>

**案例:无限加载**

<loadMore></loadMore>


## 原生事件

## 支持驼峰或短横线分隔
