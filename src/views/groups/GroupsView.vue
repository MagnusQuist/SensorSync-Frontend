<template>
    <div class="hidden flex-col md:flex">
        <div class="flex-1 space-y-4 p-8 pt-6">
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-light">
                    Groups Overview
                </h2>
                <div class="flex items-center space-x-2">
                    <Sheet>
                        <SheetTrigger>
                            <Button :to="{ name: 'devices-add' }"
                                :class="cn(buttonVariants({ variant: 'default', size: 'sm' }))">
                                Add Group
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Create Group</SheetTitle>
                                <SheetDescription>
                                    Add a new group.
                                </SheetDescription>
                            </SheetHeader>
                            <GroupForm />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <GroupList />
        </div>
    </div>
</template>

<script setup lang="ts">
import GroupList from './components/GroupList.vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Button from '@/components/ui/button/Button.vue';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import GroupForm from './components/GroupForm.vue'
</script>

<style scoped></style>
