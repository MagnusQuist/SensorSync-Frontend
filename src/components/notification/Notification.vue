<template>
    <div class="flex relative items-center w-full p-4 space-x-2 bg-white divide-x 
                rtl:divide-x-reverse divide-gray-200 rounded-md shadow-lg border"
    >
        <div class="rounded-lg bg-blue-100 p-2">
            <Icon icon="material-symbols-light:notifications-rounded" class="size-6 text-blue-500" />
        </div>
        <div class="flex flex-col">
            <div class="ps-4 text-sm font-semibold text-gray-700">{{ props.title }}</div>
            <div class="ps-4 text-sm font-normal text-muted-foreground">{{ props.message }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

// Props
interface Props {
    title: string,
    message: string,
    type: string
}

// Setup
const props = defineProps<Props>()

</script>

<style scoped lang="scss">
</style>