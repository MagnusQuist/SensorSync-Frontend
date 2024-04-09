<template>
    <div :class="cn('grid gap-6', $attrs.class ?? '')">
        <form @submit.prevent="register">
            <div class="grid gap-6">
                <div class="grid gap-1">
                    <Label class="mb-1" for="username">
                        Username
                    </Label>
                    <Input v-model="registerRequest.username" id="username" placeholder="Username" type="text"
                        :disabled="isLoading" />
                </div>
                <div class="grid gap-1">
                    <Label class="mb-1" for="password">
                        Password
                    </Label>
                    <Input v-model="registerRequest.password" id="password" placeholder="Password" type="password"
                        :disabled="isLoading" />
                </div>
                <div class="grid gap-1">
                    <Label class="mb-1" for="password">
                        Repeat Password
                    </Label>
                    <Input v-model="registerRequest.repeatPassword" id="password" placeholder="Repeat password"
                        type="password" :disabled="isLoading" />
                </div>
                <Button :disabled="isLoading">
                    Create account
                </Button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// Injects
const router = useRouter()
const route = useRoute()

// Data
const errorMessage = ref('')
const isLoading = ref(false)

const registerRequest = reactive({
    username: '',
    password: '',
    repeatPassword: '',
})

// Methods
const register = async () => {
    if (!registerRequest.username || !registerRequest.password) {
        errorMessage.value = "Please fill all fields"
        return
    }

    if (registerRequest.password !== registerRequest.repeatPassword) {
        errorMessage.value = "Passwords do not match"
        return
    }

    errorMessage.value = ''
    console.log(registerRequest)
    router.push({
        path: (route.query.redirect as string) || '/dashboard',
    })
    return
}
</script>