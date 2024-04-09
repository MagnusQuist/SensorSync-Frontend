import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function beforeEachGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    if (to.matched.some(record => (record.meta as { openEndpoint: boolean }).openEndpoint)) {
        next()
    } else {
        const token = localStorage.getItem('token')

        if (token) {
            next()
        } else {
            next('/login')
        }
    }
}