<template>
  <div class="flex flex-row min-h-screen">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style scoped>
body {
  height: 100vh;
}
</style>
