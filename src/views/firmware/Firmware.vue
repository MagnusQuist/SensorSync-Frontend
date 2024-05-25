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
                <form @submit.prevent="openConfirmFirmwareModal()" class="mt-6">
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

                        <Button :disabled="deviceToUpdate == ''">
                            Start Upgrade
                        </Button>
                    </div>
                </form>

                <Card :class="cn('shadow-none rounded-sm', $attrs.class ?? '')">
                    <CardHeader class="flex flex-col pb-2">
                        <CardTitle class="font-medium">Target Device</CardTitle>
                        <CardDescription>Selected device information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div class="">
                            <div v-if="deviceToUpdate">
                                <div v-for="value, key in devices[deviceToUpdate]">
                                    <div class="mb-4 grid grid-cols-[200px_minmax(0,1fr)] py-2 items-start last:mb-0 last:pb-0">
                                        <div class="flex h-2">
                                            <p class="text-sm font-medium leading-none">{{ key }}</p>
                                        </div>
                                        <div class="space-y-1">
                                            <p class="text-sm text-muted-foreground">{{ value }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else>
                                <p class="text-muted-foreground text-sm">
                                    Please select a device to upgrade to view its data.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>

    <Dialog :open="showConfirmFirmwareModal">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {{ upgradeStarted ? 'Update In Progress' : 'Confirm Firmware Update' }}
                </DialogTitle>
                <DialogDescription>
                    <div v-if="!upgradeStarted">
                        Are you sure you want to upgrade the firmware on the selected device?
                    </div>
                    <div v-else>
                        <p class="mb-4">
                            The firmware upgrade has started, follow its progress here and wait for it to finish.
                        </p>
                        <Progress :model-value="upgradeProgress" />
                    </div>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter v-if="!upgradeStarted">
                <DialogClose>
                    <Button @click="closeConfirmModal" variant="secondary">Close</Button>
                </DialogClose>
                <Button @click="startUpgrade" variant="default">Start Upgrade</Button>
            </DialogFooter>
            <DialogFooter v-else>
                <DialogClose>
                    <Button @click="closeConfirmModal" variant="secondary">Close</Button>
                </DialogClose>
                <Button @click="finishUpgrade" :disabled="!upgradeFinished" variant="default">Finish</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
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
import { FirmwareRequest } from '@/types/FirmwareRequest'

const deviceToUpdate = ref('')

const showConfirmFirmwareModal = ref(false)

const upgradeStarted = ref(false)

const upgradeFinished = ref(false)

const upgradeProgress = ref(0)

const toitVersion = API.modules.firmware.toitVersion

const devices = API.modules.devices.devices

const openConfirmFirmwareModal = () => {
    showConfirmFirmwareModal.value = true
}

const closeConfirmModal = () => {
    showConfirmFirmwareModal.value = false
}

const firmwareRequest: FirmwareRequest = {
    token: localStorage.getItem('token') || ''
}

const startUpgrade = async () => {
    upgradeStarted.value = true
    API.modules.firmware.startFirmwareUpgrade(firmwareRequest, deviceToUpdate.value)
        .then((response: any) => {
            if (response.errorMessage) {
                console.log(response)
                return
            } else {
                const upgradeInterval = setInterval(async () => {
                    //const res: number = await API.modules.firmware.getFirmwareUpgradeProgress(deviceToUpdate.value)
                    
                    if (upgradeProgress.value < 100) {
                        upgradeProgress.value += 4
                    } else {
                        upgradeProgress.value = 100
                        clearInterval(upgradeInterval)
                        upgradeFinished.value = true
                    }
                }, 200)
            }
        })
        .catch((errorResponse: { response:any }) => {
            upgradeStarted.value = false
            console.log(errorResponse)
            return
        })
}

const finishUpgrade = () => {
    showConfirmFirmwareModal.value = false
    deviceToUpdate.value = ''
    upgradeStarted.value = false
    upgradeProgress.value = 0
}
</script>

<style scoped lang="scss">
</style>
