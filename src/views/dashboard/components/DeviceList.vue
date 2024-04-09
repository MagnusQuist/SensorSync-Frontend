<template>
    <div class="grid gap-4">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-xl font-semibold">
                    Device List
                </CardTitle>
                <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { DeviceType } from '@/types/DeviceType'
import { cn } from '@/lib/utils'
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
    },
    {
        id: 'c7e8a633-2805-419a-bbb7-20c70b643914',
        name: 'Alarm system',
        online: true,
        athena_version: 'v0.10.0',
        toit_version: 'v2.4.0',
        group: 'Default'
    },
    {
        id: '28924167-788a-4f69-838f-822aa61eee10',
        name: 'Temperature Sensor',
        online: true,
        athena_version: 'v0.10.0',
        toit_version: 'v2.4.0',
        group: 'Default'
    },
    {
        id: 'c7e8a633-2805-419a-bbb7-20c70b643914',
        name: 'Alarm system',
        online: true,
        athena_version: 'v0.10.0',
        toit_version: 'v2.4.0',
        group: 'Default'
    },
    {
        id: '28924167-788a-4f69-838f-822aa61eee10',
        name: 'Temperature Sensor',
        online: true,
        athena_version: 'v0.10.0',
        toit_version: 'v2.4.0',
        group: 'Default'
    },
    {
        id: 'c7e8a633-2805-419a-bbb7-20c70b643914',
        name: 'Alarm system',
        online: true,
        athena_version: 'v0.10.0',
        toit_version: 'v2.4.0',
        group: 'Default'
    },
    {
        id: '28924167-788a-4f69-838f-822aa61eee10',
        name: 'Temperature Sensor',
        online: true,
        athena_version: 'v0.10.0',
        toit_version: 'v2.4.0',
        group: 'Default'
    },
    {
        id: 'c7e8a633-2805-419a-bbb7-20c70b643914',
        name: 'Alarm system',
        online: true,
        athena_version: 'v0.10.0',
        toit_version: 'v2.4.0',
        group: 'Default'
    }
]
</script>

<style scoped></style>