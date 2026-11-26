import { createRouter, createWebHistory } from 'vue-router'

import { Home } from '../../pages'

const routes = [
  { path: '/', component: Home },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
