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
                <Select v-model="device.group">
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
                <!--<Input v-model="device.group" id="device_group" placeholder="Device Group" type="text" />-->
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
                Save Group
            </Button>
        </div>
    </form>
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
import { computed, reactive } from 'vue'

// Props
interface Props {
    deviceUuid?: IDevice['uuid']
}

// Setup
const props = defineProps<Props>()

const device = props.deviceUuid
    ? reactive({ ...API.modules.devices.devices[props.deviceUuid] })
    : reactive({ name: '' } as IDevice)

const groups = API.modules.groups.allGroups


const isSubmitDisabled = computed(() => {
    return !device.name
})
</script>

<style scoped></style>