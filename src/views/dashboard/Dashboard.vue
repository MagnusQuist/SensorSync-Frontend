<template>
    <div class="hidden flex-col md:flex">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-light">
                    Dashboard
                </h2>
                <div class="flex items-center space-x-2">
                    <RouterLink :to="{ name: 'devices-add' }"
                        :class="cn(buttonVariants({ variant: 'default', size: 'sm' }))">
                        Add Device
                    </RouterLink>
                </div>
            </div>
            <DeviceList />

        </div>
    </div>
</template>

<script setup lang="ts">
import DeviceList from './components/DeviceList.vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

</script>

<style scoped></style>
