import { RestResponse } from "@/types/RestResponse"
import { IDevice } from "@/types/IDevice"
import { WorkerBase } from './WorkerBase'
import axios from "axios";
import { ref } from "vue";

export default class devices {
    private worker: WorkerBase<Record<IDevice['uuid'], IDevice>> | null = null;
    public devices = ref<Record<IDevice['uuid'], IDevice> | null>(null);

    constructor(private readonly baseURL: string, private readonly interval: number) {
        this.initModule()
    }

    initModule() {
        this.getAllDevices().then(data => {
            this.devices.value = data;
            this.initWorker();
        }).catch(error => {
            console.error('Error initializing module:', error);
        });
    }

    initWorker() {
        if (!this.worker) {
            this.worker = new WorkerBase(async () => await this.getAllDevices(), this.interval)
            this.worker?.start()
            this.worker.onUpdate((data: any) => {
                this.devices.value = data
            })
        }
    }

    async getAllDevices(): Promise<Record<IDevice['uuid'], IDevice>> {
        const response = await axios.get(`${this.baseURL}/devices`)
        return response.data.reduce((acc: Record<string, IDevice>, device: IDevice) => {
            acc[device.uuid] = { ...device }
            return acc
        }, {})
    }

    async DeleteDevice(uuid: string): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            axios.delete(`${this.baseURL}/devices/${uuid}`)
                .then(async (response) => {
                    delete this.devices.value![uuid];
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}