import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import './plugins/element.js'

import './assets/css/reset.css' 
import './assets/css/common.css' 

axios.defaults.baseURL = 'http://localhost:3000'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
