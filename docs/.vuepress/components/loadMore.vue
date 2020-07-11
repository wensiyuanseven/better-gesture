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
    //   todo加截流函数
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
