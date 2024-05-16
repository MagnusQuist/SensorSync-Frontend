import { RestResponse } from "@/types/RestResponse"
import { IDevice } from "@/types/IDevice"
import { SetGroupRequest } from "@/types/SetGroupRequest"
import { WorkerBase } from './WorkerBase'
import axios from "axios";
import { ref } from "vue";

export default class devices {
    private worker: WorkerBase<Record<IDevice['uuid'], IDevice>> | null = null
    public devices = ref<Record<IDevice['uuid'], IDevice> | null>(null)

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
        const sortedDevices = response.data.sort((a: IDevice, b: IDevice) => a.uuid.localeCompare(b.uuid))
        return sortedDevices.reduce((acc: Record<string, IDevice>, device: IDevice) => {
            acc[device.uuid] = { ...device }
            return acc
        }, {})
    }

    async setDeviceGroup(device_uuid: string, group_uuid: SetGroupRequest): Promise<Record<IDevice['uuid'], IDevice>> {
        const response = await axios.put(`${this.baseURL}/devices/${device_uuid}`, group_uuid)
        return response.data
    }

    async updateDevice(device: IDevice): Promise<Record<IDevice['uuid'], IDevice>> {
        try {
            const response = await axios.put(`${this.baseURL}/devices/${device.uuid}`, device)
            const updatedDevice = response.data

            if (this.devices.value) {
                this.devices.value = {
                    ...this.devices.value,
                    [updatedDevice.uuid]: updatedDevice
                }
            } else {
                this.devices.value = { [updatedDevice.uuid]: updatedDevice }
            }

            return updatedDevice

        } catch (error: any) {
            console.log('Could not update device: ' + error)
        }

        return this.devices.value as Record<IDevice['uuid'], IDevice>;
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