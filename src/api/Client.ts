import { LoginRequest } from '@/types/LoginRequest'
import { RegisterRequest } from '@/types/RegisterRequest'
import { RestResponse } from '@/types/RestResponse'
import axios from 'axios'
import devices from './endpoints/Devices'

export class API {
    // All endpoints here
    modules = {
        devices: devices
    }

    baseURL = ''

    constructor(url: string) {
        this.baseURL = url
        this.initAPI()
    }

    initAPI() {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")
    }

    async login(loginRequest: LoginRequest): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            axios
                .post(`${this.baseURL}/auth/login`, {
                    email: loginRequest.email,
                    password: loginRequest.password,
                })
                .then(async (response) => {
                    localStorage.setItem('token', response.data.token)
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    async register(registerRequest: RegisterRequest): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            axios
                .post(`${this.baseURL}/auth/register`, {
                    name: registerRequest.name,
                    email: registerRequest.email,
                    password: registerRequest.password
                })
                .then(async (response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default new API(import.meta.env.VITE_GATEWAY_URL)