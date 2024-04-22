<template>
    <Card class="rounded-sm shadow-sm">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-xl font-semibold">
                Group List
            </CardTitle>
            <Icon icon="material-symbols-light:all-inbox-rounded" class="size-6" />
        </CardHeader>
        <CardContent>
            <template v-if="groups.length">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead>
                                Location
                            </TableHead>
                            <TableHead>
                                Number of Devices
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(group, index) in groups " :key="index">
                            <TableCell class="font-medium">
                                {{ group.name }}
                            </TableCell>
                            <TableCell>
                                {{ group.location }}
                            </TableCell>
                            <TableCell>
                                {{ group.device_count }}
                            </TableCell>
                            <TableCell class="text-right space-x-2">
                                <Sheet>
                                    <SheetTrigger>
                                        <a href="#" :class="cn(buttonVariants({ variant: 'outline', size: 'sm' }))">
                                            <Icon icon="material-symbols-light:edit-square-outline-rounded"
                                                class="size-5" />
                                        </a>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Edit Group</SheetTitle>
                                            <SheetDescription>
                                                Make changes to the group.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <GroupForm :groupUuid="group.uuid" />
                                    </SheetContent>
                                </Sheet>
                                <a href="#" @click="openConfirmDeleteModal(group.uuid)"
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
                    <h3 class="text-lg mb-1 font-medium text-slate-800">No Group</h3>
                    <p class="text-muted-foreground text-sm mb-4">Add a new group to view it in the list</p>
                    <Button variant="outline">Add Group</Button>
                </div>
            </template>
        </CardContent>
    </Card>

    <Dialog :open="showConfirmDeleteModal">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Group?</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this group? Deleting a group with devices assigned, will
                    automatically
                    assign the devices to the Default group.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose>
                    <Button @click="closeDeleteModal" variant="secondary">Close</Button>
                </DialogClose>
                <Button @click="deleteGroup" variant="destructive">Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { IGroup } from '@/types/IGroup'
import { cn } from '@/lib/utils'
import GroupForm from './GroupForm.vue'
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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { buttonVariants } from '@/components/ui/button';
import API from '@/api/Client'
import { onMounted, ref } from 'vue'

const groupToDelete = ref<string | null>(null)

const showConfirmDeleteModal = ref(false)

const groups = ref<IGroup[]>([])

onMounted(() => {
    //  getGroups()
    groups.value = [
        {
            uuid: "7035d89e-f64a-4cc3-9756-50dde12544f3",
            name: "Default Group",
            location: "None",
            device_count: 1,
            editable: false
        },
        {
            uuid: "f704bd0f-88cf-4b47-b0c8-826420b1b89a",
            name: "Security Devices",
            location: "Main Building",
            device_count: 3,
            editable: true
        }
    ]
})

const openConfirmDeleteModal = (guid: IGroup['uuid']) => {
    groupToDelete.value = guid
    showConfirmDeleteModal.value = true
}

//const getGroups = async () => {
//    groups.value = await API.modules.groups.GetAllGroups()
//}

const closeDeleteModal = () => {
    showConfirmDeleteModal.value = false
}

const deleteGroup = async () => {
    if (!groupToDelete.value) {
        return
    }
    showConfirmDeleteModal.value = false
    await API.modules.groups.DeleteGroup(groupToDelete.value)
    groupToDelete.value = null
}

</script>

<style scoped></style>