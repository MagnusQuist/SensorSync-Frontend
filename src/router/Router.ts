import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './Routes'
import { beforeEachGuard } from './guards/BeforeEach'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(beforeEachGuard)

export default router