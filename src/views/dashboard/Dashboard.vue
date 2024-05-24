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
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard 
                    :title="'Connected Devices'"
                    :data="devicesLength"
                />
                <DashboardCard 
                    :title="'Device Groups'"
                    :data="groupsLength"
                />
                <DashboardCard 
                    :title="'ATHENA Version'"
                    :data="athenaVersion"
                    :subtitle="'Latest release'"
                />
                <DashboardCard 
                    :title="'Toit Version'"
                    :data="toitVersion"
                    :subtitle="'Latest release'"
                />
            </div>
            <DeviceList />

        </div>
    </div>
</template>

<script setup lang="ts">
import DeviceList from './components/DeviceList.vue'
import DashboardCard from './components/DashboardCard.vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import API from '@/api/Client'
import { onMounted, ref } from 'vue'

const athenaVersion = ref('')
const toitVersion = ref('')

const devicesLength = Object.keys(API.modules.devices.devices.value).length
const groupsLength = Object.keys(API.modules.groups.groups.value).length

onMounted(() => {
    fetchVersions()
})

const getAthenaVersion = () => {
    return API.modules.firmware.athenaVersion
}

const getToitVersion = () => {
    return API.modules.firmware.toitVersion
}

const fetchVersions = () => {
    try {
        athenaVersion.value = getAthenaVersion()
        toitVersion.value = getToitVersion()
    } catch(error) {
        console.error('Error fecthing firmware versions: ', error)
    }
}
</script>

<style scoped></style>
