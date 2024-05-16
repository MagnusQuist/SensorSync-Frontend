import { IGroup } from "@/types/IGroup";
import { WorkerBase } from "./WorkerBase";
import { ref } from "vue";
import axios from "axios";
import { RestResponse } from "@/types/RestResponse";

export default class devices {
    private worker: WorkerBase<Record<IGroup['uuid'], IGroup>> | null = null
    public groups = ref<Record<IGroup['uuid'], IGroup> | null>(null)

    constructor(private readonly baseURL: string, private readonly interval: number) {
        this.initModule()
    }

    initModule() {
        this.getAllGroups().then(data => {
            this.groups.value = data
            this.initWorker()
        }).catch(error => {
            console.error('Error intializing module: ', error)
        })
    }

    initWorker() {
        if (!this.worker) {
            this.worker = new WorkerBase(async () => await this.getAllGroups(), this.interval)
            this.worker?.start()
            this.worker.onUpdate((data: any) => {
                this.groups.value = data
            })
        }
    }

    async getAllGroups(): Promise<Record<IGroup['uuid'], IGroup>> {
        const response = await axios.get(`${this.baseURL}/groups`)
        const sortedGroups = response.data.sort((a: IGroup, b: IGroup) => a.uuid.localeCompare(b.uuid))
        return sortedGroups.reduce((acc: Record<string, IGroup>, group: IGroup) => {
            acc[group.uuid] = { ...group }
            return acc
        }, {})
    }

    async updateGroup(group: IGroup): Promise<Record<IGroup['uuid'], IGroup>> {
        try {
            const response = await axios.put(`${this.baseURL}/groups/${group.uuid}`, group)
            const updatedGroup = response.data

            if (this.groups.value) {
                this.groups.value = {
                    ...this.groups.value,
                    [updatedGroup.uuid]: updatedGroup
                }
            } else {
                this.groups.value = { [updatedGroup.uuid]: updatedGroup }
            }

            return updatedGroup

        } catch (error: any) {
            console.log('Could not update device: ' + error)
        }

        return this.groups.value as Record<IGroup['uuid'], IGroup>;
    }

    async createGroup(group: IGroup): Promise<Record<IGroup['uuid'], IGroup>> {
        const response = await axios.post(`${this.baseURL}/groups`, group)
        return response.data
    }

    async DeleteGroup(uuid: string): Promise<RestResponse> {
        return new Promise<RestResponse>((resolve, reject) => {
            axios.delete(`${this.baseURL}/groups/${uuid}`)
                .then(async (response) => {
                    delete this.groups.value![uuid];
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}