<template>
    <form @submit.prevent="submitForm" class="mt-6">
        <div class="grid gap-6">
            <div class="grid gap-1">
                <Label class="mb-1" for="email">
                    Name
                </Label>
                <Input v-model="group.name" id="name" placeholder="Group name" type="text" />
            </div>
            <div class="grid gap-1">
                <Label class="mb-1" for="location">
                    Location
                </Label>
                <Input v-model="group.location" id="location" placeholder="Location" type="text" />
            </div>

            <Button :disabled="isSubmitDisabled">
                Save Group
            </Button>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { IGroup } from '@/types/IGroup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import API from '@/api/Client'
import { computed, reactive } from 'vue'

// Props
interface Props {
    groupUuid?: IGroup['uuid']
}

// Setup
const props = defineProps<Props>()

const group = props.groupUuid
    ? reactive({ ...API.modules.groups.allGroups[props.groupUuid] })
    : reactive({ name: '', location: '' } as IGroup)


const isSubmitDisabled = computed(() => {
    return (
        !group.name || !group.location
    )
})

const submitForm = async () => {

}
</script>

<style scoped></style>