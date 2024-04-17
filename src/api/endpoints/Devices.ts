import { RestResponse } from "@/types/RestResponse";
import axios from "axios";

export default class devices {

    static async GetAllDevices(): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            axios
                .get(`${process.env.VUE_APP_API_BASE_URL}/devices`)
                .then(async (response) => {
                    console.log(response)
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}