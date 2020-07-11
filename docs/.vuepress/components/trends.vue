<template>
  <section class="trends" v-gesture:tap="tap">点按</section>
</template>

<script>
export default {
  name: 'trends',
  data() {
    return {}
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {
    tap(event) {
      event.gesture.on('pressMove', this.pressMove)
    },
    pressMove(event) {
        console.log(event,'触发')
    }
  }
}
</script>

<style scoped lang="less">
</style>
