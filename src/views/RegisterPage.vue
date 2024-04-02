<template>
    <div class="w-full flex flex-col items-center justify-center static">
        <div class="w-96 items-center justify-center flex flex-col">
            <h1 class="text-2xl font-semibold mb-6 text-gray-100">Register Account</h1>
            <h1 class="text-sm font-medium mb-6 text-gray-400 text-center">Create an account to manager your IoT devices
            </h1>

            <div class="login-form w-full">
                <BaseForm @submit.prevent="register">
                    <BaseInput v-model="registerRequest.username" :class="[
                    {
                        'border-red-500':
                            !!errorMessage
                    },
                ]" label="Username" />

                    <BaseInput v-model="registerRequest.password" :class="[
                    {
                        'border-red-500':
                            !!errorMessage
                    },
                ]" type="password" label="Password" />

                    <BaseInput v-model="registerRequest.repeatPassword" :class="[
                    {
                        'border-red-500': !!errorMessage
                    },
                ]" type="password" label="Repeat password" />

                    <div class="mt-6 text-sm">
                        <span v-if="errorMessage" class="text-red-500">{{ errorMessage }}</span>
                    </div>

                    <div>
                        <button type="submit"
                            class="w-full mt-4 p-2.5 text-sm bg-sky-600 text-white rounded-md hover:bg-sky-500 focus:bg-sky-500 focus:outline-none transition-colors duration-300">Sign
                            Up</button>
                    </div>
                </BaseForm>

                <div class="mt-6 text-sm text-gray-400 text-center">
                    <p>Already have an account? <a href="/login" class="text-sky-500 hover:underline">Sign in here</a>
                    </p>
                </div>
            </div>
        </div>
        <div class="absolute right-20 bottom-20">
            <img src="/img/athena_icon.svg" alt="Athena Icon" class="w-32">
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseForm from '@components/form/BaseForm.vue'
import BaseInput from '@components/input/BaseInput.vue'
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Injects
const router = useRouter()
const route = useRoute()

// Data
const errorMessage = ref('')

const registerRequest = reactive({
    username: '',
    password: '',
    repeatPassword: '',
})

// Watchers 

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

<style scoped></style>