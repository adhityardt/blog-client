import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './views/MainPage.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/mainpage',
      name: 'mainpage',
      component: MainPage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})