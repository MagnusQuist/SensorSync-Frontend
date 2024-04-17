<template>
    <Card class="rounded-sm shadow-sm">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-xl font-semibold">
                Device List
            </CardTitle>
            <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
        </CardHeader>
        <CardContent>
            <template v-if="devices.length">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="w-[100px]">
                                Status
                            </TableHead>
                            <TableHead class="w-[300px]">
                                Name
                            </TableHead>
                            <TableHead>
                                ATHENA Firmware
                            </TableHead>
                            <TableHead>
                                Toit Firmware
                            </TableHead>
                            <TableHead class="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(device, index) in devices " :key="index">
                            <TableCell>
                                <span v-if="!device.online" class="flex h-3 w-3 rounded-full bg-green-400" />
                                <span v-else class="flex h-3 w-3 rounded-full bg-red-500" />
                            </TableCell>
                            <TableCell class="font-medium">
                                {{ device.name }}
                            </TableCell>
                            <TableCell>
                                {{ device.athena_version }}
                            </TableCell>
                            <TableCell>
                                {{ device.toit_firmware_version }}
                            </TableCell>
                            <TableCell class="text-right space-x-2">
                                <a href="#" :class="cn(buttonVariants({ variant: 'outline', size: 'sm' }))">
                                    <Icon icon="material-symbols-light:edit-square-outline-rounded" class="size-5" />
                                </a>
                                <a href="#" @click="openConfirmDeleteModal(device.uuid)"
                                    :class="cn(buttonVariants({ variant: 'outline', size: 'sm' }))">
                                    <Icon icon="material-symbols-light:delete-outline-rounded" class="size-5" />
                                </a>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </template>
            <template v-else>
                <div class="flex flex-col items-center justify-center">
                    <h3 class="text-lg mb-1 font-medium text-slate-800">No Devices</h3>
                    <p class="text-muted-foreground text-sm mb-4">Add a new device to view it in the list</p>
                    <Button variant="outline">Add Device</Button>
                </div>
            </template>
        </CardContent>
    </Card>

    <Dialog :open="showConfirmDeleteModal">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Device?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this device? If the device is still online, it will reappear in the
                    list. Disconnect the device if your want to remove it completely.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose>
                    <Button @click="closeDeleteModal" variant="secondary">Close</Button>
                </DialogClose>
                <Button @click="deleteDevice" variant="destructive">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { IDevice } from '@/types/IDevice'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { buttonVariants } from '@/components/ui/button';
import API from '@/api/Client'
import { onMounted, ref } from 'vue'

const deviceToDelete = ref<string | null>(null)

const showConfirmDeleteModal = ref(false)

const devices = ref<IDevice[]>([])

onMounted(() => {
    getDevices()
})

const openConfirmDeleteModal = (guid: IDevice['uuid']) => {
    console.log(guid)
    deviceToDelete.value = guid
    showConfirmDeleteModal.value = true
}

const getDevices = async () => {
    devices.value = await API.modules.devices.GetAllDevices()
}

const closeDeleteModal = () => {
    showConfirmDeleteModal.value = false
}

const deleteDevice = async () => {
    if (!deviceToDelete.value) {
        return
    }
    showConfirmDeleteModal.value = false
    await API.modules.devices.DeleteDevice(deviceToDelete.value)
    deviceToDelete.value = null
}

</script>

<style scoped></style>