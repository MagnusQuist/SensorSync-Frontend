<template>
    <TheSidebar :is-collapsed="false" :links="links" />
    <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div class="main-content flex flex-col flex-grow p-4">
            <RouterView />
        </div>
    </main>
</template>

<script setup lang="ts">
import TheSidebar from '@/components/navigation/TheSidebar.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const links = ref(
    router.options.routes
        .find((route) => route.path === '/')
        ?.children?.filter(
            (route) => route.meta?.showInMenu
        ),
)

console.log(links)


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