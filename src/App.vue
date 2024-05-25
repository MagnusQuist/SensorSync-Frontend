<template>
  <div class="flex flex-row min-h-screen">
    <RouterView :key="$route.fullPath" />
    <div class="absolute top-0 z-[100] rounded-sm flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      <div v-for="notification in notifications">
        <Notification 
          :title="notification.title"
          :message="notification.message"
          :type="notification.type"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification.store';
import { storeToRefs } from 'pinia';
import Notification from '@/components/notification/Notification.vue'

const notifyStore = useNotificationStore()
const { notifications } = storeToRefs(notifyStore)
</script>

<style scoped>
body {
  height: 100vh;
}
</style>
