import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import Dashboard from "./components/Dashboard.vue";
import Check from "./components/Check.vue";
import AddBalance from "./components/AddBalance.vue";
import Pay from "./components/Pay.vue";

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8000/api/';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/login',
      component: App,
      name: 'login'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'dashboard'
    },
    {
      path: '/check-balance',
      component: Check,
      name: 'check-balance'
    },
    {
      path: '/add-balance',
      component: AddBalance,
      name: 'add-balance'
    },
    {
      path: '/pay',
      component: Pay,
      name: 'pay'
    }
  ]
});

export default new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h('router-view'),
  created() {
    const token = window.localStorage.getItem('token');
    this.axios.interceptors.request.use(config => {
      if(token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });
  }
})
.$mount('#app')
