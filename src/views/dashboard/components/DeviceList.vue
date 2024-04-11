<template>
    <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-xl font-semibold">
                Device List
            </CardTitle>
            <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
        </CardHeader>
        <CardContent>
            <template  v-if="devices.length">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[300px]">
                            Name
                        </TableHead>
                        <TableHead>
                            Status
                        </TableHead>
                        <TableHead>
                            Group
                        </TableHead>
                        <TableHead>
                            Firmware
                        </TableHead>
                        <TableHead class="text-right">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(device, index) in devices " :key="index">
                        <TableCell class="font-medium">
                            {{ device.name }}
                        </TableCell>
                        <TableCell>
                            {{ device.online }}
                        </TableCell>
                        <TableCell>
                            {{ device.group }}
                        </TableCell>
                        <TableCell>
                            {{ device.athena_version }}
                        </TableCell>
                        <TableCell class="text-right space-x-2">
                            <a href="#" :class="cn(buttonVariants({ variant: 'outline', size: 'sm' }))">
                                <Icon icon="material-symbols-light:edit-square-outline-rounded" class="size-5" />
                            </a>
                            <a href="#" :class="cn(buttonVariants({ variant: 'outline', size: 'sm' }))">
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
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { DeviceType } from '@/types/DeviceType'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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

const devices: DeviceType[] = [
    {
        id: '28924167-788a-4f69-838f-822aa61eee10',
        name: 'Temperature Sensor',
        online: true,
        athena_version: 'v0.10.0',
        toit_version: 'v2.4.0',
        group: 'Default'
    }
]
</script>

<style scoped></style>