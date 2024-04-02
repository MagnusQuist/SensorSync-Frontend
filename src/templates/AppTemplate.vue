<template>
    <aside
        class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-900">
        <TheSideBar />
    </aside>
    <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div class="main-content flex flex-col flex-grow p-6">
            <RouterView />
        </div>
    </main>
</template>

<script setup lang="ts">
import TheSideBar from '@/components/navigation/TheSideBar.vue';
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