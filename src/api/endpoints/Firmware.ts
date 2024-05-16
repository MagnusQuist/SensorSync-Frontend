import axios from "axios"

export default class Firmware {
    constructor(private readonly baseURL: string, private readonly interval: number) {
        this.initModule()
        console.log(this.interval)
    }

    initModule() {
        // No initiation needed for this module
    }

    async getAthenaVersion(): Promise<string> {
        const response = await axios.get(`${this.baseURL}/firmware/athena/latest`)
        return response.data
    }

    async getToitVersion(): Promise<string> {
        const response = await axios.get(`${this.baseURL}/firmware/toit/latest`)
        return response.data
    }
}