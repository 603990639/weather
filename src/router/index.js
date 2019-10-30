import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomePage from '../components/HomePage'
import SearchMsg from '../views/SearchMsg'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'page',
    props: true,
    component: HomePage
  },
  {
    path: '/home',
    name: 'home',
    props: true,
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    props: true,
    component: SearchMsg
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
