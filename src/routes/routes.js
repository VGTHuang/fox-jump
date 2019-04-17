import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home'
import LevelsContainer from '@/components/LevelsContainer'
import Levels from '@/components/Levels'
import Results from '@/components/Results'
import Bar from '@/components/Bar'

Vue.use(VueRouter)

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/levels/', name: 'levelsContainer', component: LevelsContainer, children: [
        {path: ':lv', component: Levels}
    ]},
    {path: '/results/:finishState', name: 'results', component: Results},
    {path: '*', name: 'bar', component: Bar}
]

const router = new VueRouter({
    routes
})

export { router }