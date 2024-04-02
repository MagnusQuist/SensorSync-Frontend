<template>
    <div class="flex flex-col h-full w-64 overflow-hidden text-gray-300 bg-gray-950 p-6">
        <span class="text-sm font-bold">ATHENA Fleet</span>
        <div class="w-full mt-2">
            <div class="flex flex-col w-full mt-3 border-t border-gray-900">
                <div v-for="(route, index) in appRoutes" :key="index">
                    <RouterLink :to="route.path"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-900 hover:text-gray-200">
                        <Icon v-if="route.meta?.iconName" :name="String(route.meta.iconName)" />
                        <span class="text-sm font-medium">{{ route.meta?.title }}</span>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import Icon from '@/components/icon/BaseIcon.vue'

const router = useRouter()

const appRoutes = ref(
    router.options.routes
        .find((route) => route.path === '/')
        ?.children?.filter(
            (route) => route.meta?.showInMenu
        ),
)


</script>

<style lang="scss" scoped>
svg {
    transform: scale(0.6);
    margin-right: .8rem;
    fill: rgb(209 213 219);
}
</style>