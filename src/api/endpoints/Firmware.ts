import { FirmwareRequest } from "@/types/FirmwareRequest"
import { IDevice } from "@/types/IDevice"
import axios from "axios"
import { ref } from "vue"

export default class Firmware {
    public toitVersion = ref<string | null>(null)
    public athenaVersion = ref<string | null>(null)

    constructor(private readonly baseURL: string, private readonly interval: number) {
        this.initModule()
        console.log(this.interval)
    }

    initModule() {
        this.getToitVersion().then(data => {
            this.toitVersion.value = data
        }).catch(error => {
            console.error('Limit may be exceeded... ', error)
        })
        this.getAthenaVersion().then(data => {
            this.athenaVersion.value = data
        }).catch(error => {
            console.error('Limit may be exceeded... ', error)
        })
    }

    async getAthenaVersion(): Promise<string> {
        const response = await axios.get(`${this.baseURL}/firmware/athena/latest`)
        return response.data
    }

    async getToitVersion(): Promise<string> {
        const response = await axios.get(`${this.baseURL}/firmware/toit/latest`)
        return response.data
    }

    async startFirmwareUpgrade(firmwareRequest: FirmwareRequest, device: IDevice['uuid']): Promise<any> {
        console.log(device)

        return new Promise<any>((resolve, reject) => {
            axios.post(`${this.baseURL}/firmware/update/${device}`, {
                token: firmwareRequest.token
            })
                .then(async (response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    async getFirmwareUpgradeProgress(device: IDevice['uuid']): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            axios.get(`${this.baseURL}/firmware/update/${device}/progress`)
                .then(async (response) => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}