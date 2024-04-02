<template>
    <InlineSvg :src="path" :title="props.name" :keepDuringLoading="true" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import InlineSvg from 'vue-inline-svg'

// Props
interface Props {
    name: string
    variant?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: '',
})

// computed
const append = computed(() => (props.variant ? `_${props.variant}` : ''))
const path = computed(() => `/img/icons/${props.name + append.value}.svg`)
</script>

<style lang="scss" scoped>
svg {
    display: inline-block;
    width: 2.2rem;
    min-height: 2.2rem;

    path {
        fill: inherit;
    }
}

img {
    display: inline-block;
    width: 2.2rem;
    min-height: 2.2rem;
}
</style>