<template>
    <Card class="rounded-sm shadow-sm">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-xl font-semibold">
                Group List
            </CardTitle>
            <Icon icon="material-symbols-light:all-inbox-rounded" class="size-6" />
        </CardHeader>
        <CardContent>
            <template v-if="hasGroups">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Name
                            </TableHead>
                            <TableHead>
                                Location
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
                    <Sheet>
                        <SheetTrigger>
                            <Button href="#" :class="cn(buttonVariants({ variant: 'default' }))">
                                Add Group
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit Group</SheetTitle>
                                <SheetDescription>
                                    Make changes to the group.
                                </SheetDescription>
                            </SheetHeader>
                            <GroupForm />
                        </SheetContent>
                    </Sheet>
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
import { computed, ref } from 'vue'
import { NotificationType, useNotificationStore } from '@/stores/notification.store'

// Injects
const notifyStore = useNotificationStore()

const groupToDelete = ref<string | null>(null)

const showConfirmDeleteModal = ref(false)

const groups = API.modules.groups.groups

const hasGroups = computed(() => groups.value != null && Object.keys(groups.value).length > 0)

const openConfirmDeleteModal = (guid: IGroup['uuid']) => {
    groupToDelete.value = guid
    showConfirmDeleteModal.value = true
}

const closeDeleteModal = () => {
    showConfirmDeleteModal.value = false
}

const deleteGroup = async () => {
    if (!groupToDelete.value) {
        return
    }
    showConfirmDeleteModal.value = false
    await API.modules.groups.DeleteGroup(groupToDelete.value)
    notifyStore.notify("Group Deleted", "The group has been removed.", NotificationType.Success)
    groupToDelete.value = null
}

</script>

<style scoped></style>