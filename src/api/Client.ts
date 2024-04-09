import { LoginRequest } from '@/types/LoginRequest'
import { RestResponse } from '@/types/RestResponse'
import axios from 'axios'

export class API {
    // All endpoints here
    modules = {

    }

    baseURL = ''

    constructor(url: string) {
        this.baseURL = url
    }

    async login(loginRequest: LoginRequest): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            axios
                .post(`${this.baseURL}/auth/login`, {
                    username: loginRequest.username,
                    password: loginRequest.password,
                })
                .then(async (response) => {
                    // We should set the token here
                    console.log(response)
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export default new API('http://localhost:8285')