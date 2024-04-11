<template>
    <TheSidebar :is-collapsed="false" :links="links" />
    <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div class="main-content flex flex-col flex-grow p-4">
            <RouterView />
        </div>
    </main>
</template>

<script setup lang="ts">
import TheSidebar from '@/components/navigation/TheSideBar.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { NavigationLink } from '@/types/NavigationLink';

const router = useRouter()

const links = ref(
    (router.options.routes
        .find((route) => route.path === '/')
        ?.children?.filter(
            (route) => route.meta?.showInMenu
        ) ?? []).map(route => ({
            path: route.path,
            meta: {
                showInMenu: route.meta?.showInMenu ?? false,
                iconName: route.meta?.iconName ?? '',
                variant: route.meta?.variant ?? 'default',
                title: route.meta?.title ?? '',
                label: route.meta?.label ?? '',
            }
        })) as NavigationLink[],
);
</script>

<style scoped>
main {
    overflow-x: hidden;
    height: 100vh;
}

.wrapper {
    padding: 2.4rem;
}

.no-padding {
    padding: 0;
}
</style>