import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/all.css'
import './assets/js/all.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from 'axios'
import store from './store'


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
