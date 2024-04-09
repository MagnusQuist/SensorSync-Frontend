<template>
    <div :class="cn('grid gap-6', $attrs.class ?? '')">
        <form @submit.prevent="login">
            <div class="grid gap-6">
                <div class="grid gap-1">
                    <Label class="mb-1" for="username">
                        Username
                    </Label>
                    <Input v-model="loginRequest.username" id="username" placeholder="Username" type="text"
                        :disabled="isLoading" />
                </div>
                <div class="grid gap-1">
                    <Label class="mb-1" for="password">
                        Password
                    </Label>
                    <Input v-model="loginRequest.password" id="password" placeholder="Password" type="password"
                        :disabled="isLoading" />
                </div>
                <Button :disabled="isLoading">
                    Sign in
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
import API from '@/api/Client'

// Injects
const router = useRouter()
const route = useRoute()

// Data
const errorMessage = ref('')
const isLoading = ref(false)

const loginRequest = reactive({
    username: '',
    password: '',
})

const login = async () => {
    if (!loginRequest.username || !loginRequest.password) {
        errorMessage.value = "Please fill all fields"
        return
    }
    isLoading.value = true
    API.login(loginRequest)
        .then(() => {
            router.push({
                path: (route.query.redirect as string) || '/dashboard',
            })
        })
        .catch((errorResponse: { response: any; }) => {
            isLoading.value = false
            const { response } = errorResponse

            if (response.status === 401) {
                errorMessage.value = 'Authentication failed'
                return
            }

            errorMessage.value = 'API might be down.'
        })

    errorMessage.value = ''
    console.log(loginRequest)
    isLoading.value = false
    router.push({
        path: (route.query.redirect as string) || '/dashboard',
    })
    return
}
</script>