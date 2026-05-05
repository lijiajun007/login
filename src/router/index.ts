import { createRouter, createWebHistory } from 'vue-router'
import Index from './../views/index.vue'
import Login from './../views/login.vue'
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Index
  },
  {
    path: '/',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

