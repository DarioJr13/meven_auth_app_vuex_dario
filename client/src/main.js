import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

// Seting up default vue'$ http modules for api calls
Vue.prototype.$http = axios;
//Load the Token from the LocalStorage
const token = localStorage.getItem("token");
// Is there is any token then we will Simply append default axios authorization headers
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
