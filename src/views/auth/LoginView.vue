<template>
    <div class="w-full flex flex-col items-center justify-center static">
        <div class="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <div class="flex flex-col space-y-2 text-center">
                <h1 class="text-2xl font-semibold tracking-tight">
                    Sign in
                </h1>
                <p class="text-sm text-muted-foreground">
                    Sign in to Athena to manager your devices
                </p>
            </div>
            <LoginForm />
            <p class="px-8 text-center text-sm text-muted-foreground">
                Don't have an account yet?
                <a href="/register" class="underline underline-offset-4 hover:text-primary">
                    Sign up here
                </a>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'
</script>

<style scoped></style>