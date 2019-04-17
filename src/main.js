import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Levels from '@/components/Levels'
import Bar from '@/components/Bar'

Vue.use(VueRouter)

Vue.config.productionTip = false


const routes = [
  {path: '/', name: 'home', component: Home},
  {path: '/levels/:lv', name: 'levels', component: Levels},
  {path: '*', name: 'bar', component: Bar}
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
