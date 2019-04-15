import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false

import Foo from './components/Foo'
import Bar from './components/Bar'

const routes = [
  {path: '/foo', component: Foo},
  {path: '/bar', component: Bar},
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
