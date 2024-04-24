<template>
    <div :class="cn('grid gap-6', $attrs.class ?? '')">
        <form @submit.prevent="register">
            <div class="grid gap-6">
                <div class="grid gap-1">
                    <Label class="mb-1" for="name">
                        Name
                    </Label>
                    <Input v-model="registerRequest.name" id="name" placeholder="Name" type="text"
                        :disabled="isLoading" />
                </div>
                <div class="grid gap-1">
                    <Label class="mb-1" for="email">
                        Email
                    </Label>
                    <Input v-model="registerRequest.email" id="email" placeholder="Email" type="email"
                        :disabled="isLoading" />
                </div>
                <div class="grid gap-1">
                    <Label class="mb-1" for="password">
                        Password
                    </Label>
                    <Input v-model="registerRequest.password" id="password" placeholder="Password" type="password"
                        :disabled="isLoading" />
                </div>

                <span v-if="errorMessage" class="text-red-500 font-medium text-sm">
                    {{ errorMessage }}
                </span>

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
import { RegisterRequest } from '@/types/RegisterRequest'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import API from '@/api/Client'
import { NotificationType, useNotificationStore } from '@/stores/notification.store'

// Injects
const router = useRouter()
const route = useRoute()

// Store
const notifyStore = useNotificationStore()

// Data
const errorMessage = ref('')
const isLoading = ref(false)

const registerRequest: RegisterRequest = reactive({
    name: '',
    email: '',
    password: '',
})

// Methods
const register = async () => {
    if (!registerRequest.name || !registerRequest.email || !registerRequest.password) {
        errorMessage.value = "Please fill all fields"
        return
    }

    isLoading.value = true

    API.register(registerRequest)
        .then((response) => {
            if (response.errorMessage) {
                notifyStore.notify("Registration failed!", NotificationType.Error)
                errorMessage.value = "Registration failed"
                return
            } else {
                notifyStore.notify("Account created successfully!", NotificationType.Success)
                router.push({
                    path: (route.query.redirect as string) || '/login',
                })
            }
        })
        .catch((errorResponse: { response: any }) => {
            notifyStore.notify("Uknown API error!", NotificationType.Error)
            isLoading.value = false
            const { response } = errorResponse

            if (response.status === 401) {
                errorMessage.value = 'Authentication failed'
                return
            }

            errorMessage.value = 'Unkown error'
        })

    errorMessage.value = ''
    return
}
</script>