<template>
    <div class="hidden flex-col md:flex">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-light">
                    Firmware
                </h2>
            </div>

            <div class="w-80">
                <p class="text-sm font-medium text-muted-foreground">
                    Select a device from the dropdown to upgrade its firmware or select a device group to update all devices at once.
                </p>
            </div>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                <form @submit.prevent="startUpgrade" class="mt-6">
                    <div class="grid gap-6">
                        <div class="grid gap-1">
                            <Label class="mb-1" for="device">Device to upgrade</Label>
                            <Select v-model="deviceToUpdate">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select device"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem v-for="(device, uuid) in devices" :key="uuid" :value="device.uuid">
                                            {{ device.name }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div class="grid gap-1">
                            <Label class="mb-1" for="toit_firmware_version">
                                Target Toit Version
                            </Label>
                            <Input v-model="toitVersion" id="toit_firmware_version"
                                placeholder="Toit Firmware Version" type="text" disabled />
                        </div>

                        <Button>
                            Start Upgrade
                        </Button>
                    </div>
                </form>

                <Card class="border-none shadow-none">
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="font-medium">Selected Device</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div v-if="deviceToUpdate">
                            {{ device }}

                            HALLO

                            {{ devices }}
                        </div>
                        <div v-else>
                            <p class="text-muted-foreground">
                                Please select a device to upgrade to view its data.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import API from '@/api/Client'
import { ref } from 'vue';

const deviceToUpdate = ref('')
const toitVersion = API.modules.firmware.toitVersion
const devices = API.modules.devices.devices

const device = deviceToUpdate.value
    ? { ...devices['536e0ae7-27ff-57a3-9733-a93ac00f4b2f'] }
    : {}

const startUpgrade = () => {

}
</script>

<style scoped lang="scss">
</style>
