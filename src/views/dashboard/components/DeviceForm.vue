<template>
    <form @submit.prevent="submitForm" class="mt-6">
        <div class="grid gap-6">
            <div class="grid gap-1">
                <Label class="mb-1" for="email">
                    Name
                </Label>
                <Input v-model="device.name" id="name" placeholder="Device name" type="text" />
            </div>
            <div class="grid gap-1">
                <Label class="mb-1" for="device_group">
                    Device Group
                </Label>
                <Select v-model="device.group_uuid">
                    <SelectTrigger>
                        <SelectValue placeholder="Select device group" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem v-for="(group, index) in groups" :key="index" :value="group.uuid">
                                {{ group.name }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div class="grid gap-1">
                <Label class="mb-1" for="athena_version">
                    ATHENA Version
                </Label>
                <Input v-model="device.athena_version" id="athena_version" placeholder="ATHENA Version" type="text"
                    disabled />
            </div>
            <div class="grid gap-1">
                <Label class="mb-1" for="toit_firmware_version">
                    Toit Version
                </Label>
                <Input v-model="device.toit_firmware_version" id="toit_firmware_version"
                    placeholder="Toit Firmware Version" type="text" disabled />
            </div>

            <Button :disabled="isSubmitDisabled">
                Save Device
            </Button>
        </div>
    </form>

    <div class="w-full mt-5">
        <Button :class="[ identifying ? 'identify-btn' : '', 'w-full' ]" variant="outline" :disabled="identifying ? true : false" @click="identifyDevice(device.uuid)">
            {{ identifying ? 'Blinking for 10 seconds' : 'Identify Device' }}
        </Button>
    </div>
</template>

<script lang="ts" setup>
import { IDevice } from '@/types/IDevice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import API from '@/api/Client'
import { NotificationType, useNotificationStore } from '@/stores/notification.store'
import { computed, reactive, ref } from 'vue'

// Injects
const notifyStore = useNotificationStore()

// Emits
const emit = defineEmits(['onUpdate:open'])

// Props
interface Props {
    deviceUuid: IDevice['uuid']
}

// Setup
const props = defineProps<Props>()

const identifying = ref(false)

const device = reactive({ ...API.modules.devices.devices.value[props.deviceUuid] })

const groups = API.modules.groups.groups

const isSubmitDisabled = computed(() => {
    return !device.name
})

const submitForm = async () => {
    await API.modules.devices.updateDevice(device)
        .then(() => {
            emit('onUpdate:open')
            notifyStore.notify("Update Successfull", "Device updated successfully!", NotificationType.Success)
            return
        }).catch((error: any) => {
            console.log(error)
            notifyStore.notify("Update Failed", "Device not updated!", NotificationType.Error)
            return
        }) 
}

const identifyDevice = async (uuid: string) => {
    await API.modules.devices.IdentifyDevice(uuid)
        .then(async () => {
            identifying.value = true
        }).catch((error: any) => {
            console.log('Could not identify device')
            console.log(error)
            return
        }).finally(async () => {
            await setTimeout(() => {
                identifying.value = false
            }, 10000)
        })
}
</script>

<style scoped>
    @keyframes border-pulsate {
        0%   { border-color: rgba(79, 150, 243, 1); }
        50%  { border-color: rgba(228, 228, 231, 1); }
        100% { border-color: rgba(79, 150, 243, 1); }
    }

    .identify-btn {
        border: 2px solid rgb(79, 150, 243);
        animation: border-pulsate 2.6s ease-in-out infinite;
    }
</style>