import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './Routes'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router