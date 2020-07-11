import Vue from 'vue'
import App from './App.vue'

import  gesture  from './lib/index'

Vue.use(gesture)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
