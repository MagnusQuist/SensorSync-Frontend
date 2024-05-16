import { LoginRequest } from '@/types/LoginRequest'
import { RegisterRequest } from '@/types/RegisterRequest'
import axios from 'axios'
import devices from './endpoints/Devices'
import groups from './endpoints/Groups'
import firmware from './endpoints/Firmware'

export class API {
    // All endpoints here
    modules: APIModule = {
        devices: devices,
        groups: groups,
        firmware: firmware
    }

    baseURL = import.meta.env.VITE_GATEWAY_URL

    constructor() {
        this.initAPI()
    }

    initAPI() {
        axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token")
        this.initModules()
    }

    initModules() {
        for (const [moduleName, moduleClass] of Object.entries(this.modules)) {
            this.modules[moduleName] = new moduleClass(this.baseURL, 1000)
        }
    }

    async login(loginRequest: LoginRequest): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios
                .post(`${this.baseURL}/auth/login`, {
                    email: loginRequest.email,
                    password: loginRequest.password,
                })
                .then(async (response) => {
                    localStorage.setItem('token', response.data.accessToken)
                    localStorage.setItem('refreshToken', response.data.refreshToken)
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    async register(registerRequest: RegisterRequest): Promise<any> {
        return new Promise<any>((resolve, reject) => {
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

    logout() {
        localStorage.removeItem("token")

    }
}

export default new API