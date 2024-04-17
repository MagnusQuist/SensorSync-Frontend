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
                    2
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
                    v1.0.2
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
                    v2.2.0
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
                    6
                </div>
                <p class="text-xs text-muted-foreground">
                    1 empty group
                </p>
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
</script>

<style scoped></style>