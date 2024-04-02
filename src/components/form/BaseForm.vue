<template>
    <form class="form space-y-4">
        <slot />
        <p v-if="error" class="text-red-500">{{ error }}</p>
    </form>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

interface Props {
    error?: string
}

const props = withDefaults(defineProps<Props>(), {
    error: '',
})
</script>