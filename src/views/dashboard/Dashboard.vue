<template>
    <div class="hidden flex-col md:flex">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-light">
                    Dashboard
                </h2>
                <div class="flex items-center space-x-2">
                    <Button>Add Device</Button>
                </div>
            </div>
            <InfoCards />
            <DeviceList />

        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import InfoCards from './components/InfoCards.vue'
import DeviceList from './components/DeviceList.vue'

</script>

<style scoped></style>
