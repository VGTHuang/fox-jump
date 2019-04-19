import Vue from 'vue'
import App from './App.vue'

import { store } from '@/store/app.store.js'
import { router } from '@/routes/routes.js'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')