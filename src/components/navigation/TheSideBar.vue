<template>
    <TooltipProvider :delay-duration="0">
        <div class="min-w-[220px] border-r-slate-100 border-r">
            <div class="border-b-slate-100 border-b py-4 px-2">
                <h1 class="text-xl font-semibold tracking-tight">
                    Sensor Sync
                    <span class="text-muted-foreground text-xs">v1.0.0</span>
                </h1>
            </div>
            <div :data-collapsed="isCollapsed" class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
                <nav
                    class="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                    <template v-for="(link, index) of links">
                        <Tooltip v-if="isCollapsed" :key="`1-${index}`" :delay-duration="0">
                            <TooltipTrigger as-child>
                                <RouterLink :to="link.path" :activeClass="cn(buttonVariants({ variant: 'default' }))">
                                    <Icon :icon="link.meta.iconName" class="size-6" />
                                    <span class="sr-only">{{ link.meta.title }}</span>
                                </RouterLink>
                            </TooltipTrigger>
                            <TooltipContent side="right" class="flex items-center gap-4">
                                {{ link.meta.title }}
                                <span v-if="link.meta.label" class="ml-auto text-muted-foreground">
                                    {{ link.meta.label }}</span>
                            </TooltipContent>
                        </Tooltip>

                        <RouterLink :to="link.path" v-else :key="`2-${index}`"
                            :exactActiveClass="cn(buttonVariants({ variant: 'default', size: 'sm' }), 'hover:text-white justify-start')"
                            :class="cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')">
                            <Icon :icon="link.meta.iconName" class="mr-2 size-6" />
                            {{ link.meta.title }}
                            <span v-if="link.meta.label"
                                :class="cn('ml-auto', link.meta.variant === 'default' && 'text-background',)">
                                {{ link.meta.label }}
                            </span>
                        </RouterLink>
                    </template>
                    <Separator />
                    <a @click="logout" :class="cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'justify-start')">
                        <Icon :icon="'material-symbols:logout-rounded'" class="mr-2 size-5" />
                        Logout
                    </a>
                </nav>
            </div>
        </div>
    </TooltipProvider>
</template>

<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Icon } from '@iconify/vue'
import { Separator } from '@/components/ui/separator'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import TooltipProvider from '../ui/tooltip/TooltipProvider.vue'
import { NavigationLink } from '@/types/NavigationLink'
import API from '@/api/Client'
import { useRoute, useRouter } from 'vue-router'

// Injects
const router = useRouter()
const route = useRoute()

interface Props {
    isCollapsed: boolean
    links: NavigationLink[]
}

defineProps<Props>()

const logout = () => {
    API.logout()
    router.push({
        path: (route.query.redirect as string) || '/login',
    })
}

</script>

<style scoped lang="scss"></style>