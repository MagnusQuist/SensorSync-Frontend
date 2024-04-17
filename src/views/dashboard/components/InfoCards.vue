<template>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card class="rounded-sm shadow-sm">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Total Devices
                </CardTitle>
                <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    {{ devices.length }}
                </div>
                <p class="text-xs text-muted-foreground">
                    All up to date
                </p>
            </CardContent>
        </Card>
        <Card class="rounded-sm shadow-sm">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Latest Athena Firmware
                </CardTitle>
                <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    {{ athena_version }}
                </div>
                <p class="text-xs text-muted-foreground">
                    No updates available
                </p>
            </CardContent>
        </Card>
        <Card class="rounded-sm shadow-sm">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Latest Toit Firmware
                </CardTitle>
                <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    {{ toit_version }}
                </div>
                <p class="text-xs text-muted-foreground">
                    No updates available
                </p>
            </CardContent>
        </Card>
        <Card class="rounded-sm shadow-sm">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Device Groups
                </CardTitle>
                <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    {{ groups }}
                </div>
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import API from '@/api/Client'
import { computed } from 'vue'

const devices = computed(() => API.modules.devices.devices)
const groups = computed(() => API.modules.devices.groups)
const athena_version = computed(() => API.modules.devices.athena_version)
const toit_version = computed(() => API.modules.devices.toit_version)

</script>

<style scoped></style>