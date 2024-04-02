import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: {
            name: 'dashboard',
        },
        component: () => import('@/templates/AppTemplate.vue'),
        children: [
            {
                name: 'dashboard',
                path: '/dashboard',
                component: () => import('@/views/Dashboard.vue'),
                meta: {
                    title: 'Dashboard',
                    showInMenu: true,
                    iconName: 'dashboard',
                }
            },
            {
                name: 'devices',
                path: '/devices',
                component: () => import('@/views/Dashboard.vue'),
                meta: {
                    title: 'Devices',
                    showInMenu: true,
                    iconName: 'device',
                }
            },
            {
                name: 'organization',
                path: '/organization',
                component: () => import('@/views/Dashboard.vue'),
                meta: {
                    title: 'Organization',
                    showInMenu: true,
                    iconName: 'organization',
                }
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/LoginPage.vue'),
        meta: {
            title: 'Login'
        }
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('@/views/RegisterPage.vue'),
        meta: {
            title: 'Register'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFoundPage.vue')
    }
]