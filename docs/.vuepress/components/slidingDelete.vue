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
