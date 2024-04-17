import { RestResponse } from "@/types/RestResponse";
import axios from "axios";

export default class devices {
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    async GetAllDevices(): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            axios
                .get(`${this.baseURL}/devices`)
                .then(async (response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}