import { RestResponse } from "@/types/RestResponse"
import { IDevice } from "@/types/IDevice"
import axios from "axios";

export default class devices {
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL
        this.invoke()
    }

    async invoke() {
        await this.GetAllDevices()
    }

    devices: Record<IDevice['uuid'], IDevice> = {}
    athena_version: string = 'v1.0.0'
    toit_version: string = 'v2.3.0'
    groups: Number = 0

    async GetAllDevices(): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            axios
                .get(`${this.baseURL}/devices`)
                .then(async (response) => {
                    this.devices = response.data
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    async DeleteDevice(uuid: string): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            axios.delete(`${this.baseURL}/devices/${uuid}`)
                .then(async (response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })

    }
}