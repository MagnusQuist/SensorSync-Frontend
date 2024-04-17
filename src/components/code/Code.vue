<template>
    <div class="">
        <code v-if="isMultiline"
            class="text-sm w-full flex text-left items-center bg-slate-900 text-white rounded-lg p-3" ref="codeBlock">
            <span v-for="(line, index) in codeLines" :key="index">{{ line }}</span>
        </code>
        <code v-else class="text-sm w-full flex text-left items-center bg-slate-900 text-white rounded-lg p-3"
            ref="codeBlock"><span class="text-green-300 pr-2">$</span> {{ code }}</code>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const codeLines = ref<string[]>([])

const props = defineProps({
    code: {
        type: String,
        required: true
    },
    isMultiline: {
        type: Boolean,
        required: false
    }
})
watchEffect(() => {
    if (props.isMultiline) {
        codeLines.value = props.code.split('\n')
    }
})

</script>

<style scoped lang="scss">
.bash[contenteditable="false"] {
    user-select: text;
}
</style>