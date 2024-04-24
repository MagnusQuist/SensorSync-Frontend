<template>
  <div class="flex flex-row min-h-screen">
    <RouterView :key="$route.fullPath" />
    <div class="fixed top-0 z-[100] rounded-sm flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      <div v-for="notification in notifications" :class="['group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-5 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full', notification.type]">
        <div class="text-sm opacity-90">
          {{  notification.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification.store';
import { storeToRefs } from 'pinia';

const notifyStore = useNotificationStore()
const { notifications } = storeToRefs(notifyStore)
</script>

<style scoped>
body {
  height: 100vh;
}
</style>
