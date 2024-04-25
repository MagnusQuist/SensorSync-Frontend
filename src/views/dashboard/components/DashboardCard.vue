<template>
    <Card class="rounded-sm shadow-sm">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
                {{ title }}
            </CardTitle>
            <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
        </CardHeader>
        <CardContent>
            <div class="text-2xl font-bold">
                {{ data }}
            </div>
            <p v-if="subtitle" class="text-xs text-muted-foreground">
                {{ subtitle }}
            </p>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
    import { Icon } from '@iconify/vue'
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card'

    // Props
    interface Props {
        title: string
        subtitle?: string
        data: any
        icon?: string
    }

    // Setup
    defineProps<Props>()
</script>

<style lang="scss"></style>