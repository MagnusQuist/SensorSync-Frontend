<template>
    <div>
        <label v-if="label" class="block text-sm font-medium text-gray-300">
            {{ label }}
        </label>

        <input ref="inputRef" :type="type" :class="[
            'mt-2 p-2.5 w-full text-sm border rounded-md bg-gray-800 border-gray-900 focus:outline-none focus:ring-1 focus:ring-sky-600',
            { error: hasError }
        ]" :value="modelValue" @input="handleInput" />
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const inputRef = ref()

// Props
interface Props {
    hasError?: boolean
    label?: string
    modelValue?: string | number
    type?: string
    isFocused?: boolean
    isHighlighted?: boolean
    readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    hasError: false,
    readonly: false,
    isFocused: false,
    isHighlighted: false,
    type: 'text'
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Methods
const handleInput = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}

// Watchers
watchEffect(() => {
    if (props.isFocused && inputRef.value) {
        inputRef.value.focus()
    }
})

watchEffect(() => {
    if (props.isHighlighted && inputRef.value) {
        inputRef.value.select()
    }
})
</script>

<style scoped></style>