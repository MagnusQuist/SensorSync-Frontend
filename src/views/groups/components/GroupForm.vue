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
                {{ props.groupUuid ? 'Save Group' : 'Create Group' }}
            </Button>
        </div>
    </form>
</template>

<script lang="ts" setup>
import { IGroup } from '@/types/IGroup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NotificationType, useNotificationStore } from '@/stores/notification.store'
import API from '@/api/Client'
import { computed, reactive } from 'vue'

// Injects
const notifyStore = useNotificationStore()

// Props
interface Props {
    groupUuid?: IGroup['uuid']
}

// Setup
const props = defineProps<Props>()

const group = props.groupUuid
    ? reactive({ ...API.modules.groups.groups.value[props.groupUuid] })
    : reactive({ name: '', location: '' } as IGroup)

const isSubmitDisabled = computed(() => {
    return (
        !group.name || !group.location
    )
})

const submitForm = () => {
    if (props.groupUuid) {
        updateGroup()
    } else {
        createGroup()
    }
}

const updateGroup = async () => {
    API.modules.groups.updateGroup(group)
        .then(() => {
            notifyStore.notify("Update Successfull", "Group updated successfully!", NotificationType.Success)
        }).catch((errorResponse: { reponse:any }) => {
            console.log(errorResponse)
            notifyStore.notify("Update Failed", "Group update failed!", NotificationType.Error)
            return
        })
}

const createGroup = async () => {
    API.modules.groups.createGroup(group)
        .then(() => {
            notifyStore.notify("Create Successfull", "Group created successfully!", NotificationType.Success)
            return
        }).catch((errorResponse: { reponse:any }) => {
            console.log(errorResponse)
            notifyStore.notify("Create Failed", "Group creation failed!", NotificationType.Error)
            return
        })
}
</script>

<style scoped></style>