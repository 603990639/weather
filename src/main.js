import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 先在控制台下载好三方库然后引入
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
