<template>
  <section class="loadMore" @scroll="scroll" ref="scroll">
    <p v-for="(item,index) in data" :key="index">{{index+1}}</p>
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
    //   todo加截流函数
    scroll() {
      if (this.load && this.$refs.scroll.scrollTop + this.$refs.scroll.clientHeight >= this.$refs.scroll.scrollHeight - this.point) {
        this.getList()
      }
    },
    getList() {
      this.load = false
      if (this.indexLoad > 3) {
        this.load = false
        this.text = '加载完成'
        // todo  可销毁事件
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
  height: 300px;
  width: 300px;
  border: 1px salmon solid;
  overflow: scroll;
  text-align: center;
}
.loadtext {
  height: 20px;
}
</style>
