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
                component: () => import('@/views/dashboard/Dashboard.vue'),
                meta: {
                    title: 'Dashboard',
                    showInMenu: true,
                    iconName: 'material-symbols-light:dashboard-rounded',
                    variant: 'default'
                }
            },
            {
                name: 'devices',
                path: '/devices',
                component: () => import('@/views/dashboard/Dashboard.vue'),
                meta: {
                    title: 'Devices',
                    showInMenu: true,
                    iconName: 'material-symbols-light:device-hub-rounded',
                    variant: 'ghost',
                },
            },
            {
                name: 'devices-add',
                path: '/devices/add',
                component: () => import('@/views/devices/AddDevice.vue'),
                meta: {
                    title: 'Add Device',
                    showInMenu: true,
                    iconName: 'material-symbols-light:note-stack-add-rounded',
                    variant: 'ghost',
                }
            },
            {
                name: 'firmware',
                path: '/firmware',
                component: () => import('@/views/dashboard/Dashboard.vue'),
                meta: {
                    title: 'Firmware',
                    showInMenu: true,
                    iconName: 'material-symbols-light:cloud-upload',
                    variant: 'ghost'
                }
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: {
            title: 'Login',
            openEndpoint: true
        }
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('@/views/auth/RegisterView.vue'),
        meta: {
            title: 'Register',
            openEndpoint: true

        }
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFoundPage.vue')
    }
]