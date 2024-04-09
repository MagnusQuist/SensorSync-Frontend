<template>
    <div class="w-full flex flex-col items-center justify-center static">
        <div class="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <div class="flex flex-col space-y-2 text-center">
                <h1 class="text-2xl font-semibold tracking-tight">
                    Create account
                </h1>
                <p class="text-sm text-muted-foreground">
                    Create an account and start managing your devices
                </p>
            </div>
            <RegisterForm />
            <p class="px-8 text-center text-sm text-muted-foreground">
                Already have an account?
                <a href="/login" class="underline underline-offset-4 hover:text-primary">
                    Sign in here
                </a>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import RegisterForm from './components/RegisterForm.vue'

</script>

<style scoped></style>