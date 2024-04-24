import { IGroup } from "@/types/IGroup";
import { WorkerBase } from "./WorkerBase";
import { ref } from "vue";
import axios from "axios";

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
        return response.data.reduce((acc: Record<string, IGroup>, group: IGroup) => {
            acc[group.uuid] = { ...group }
            return acc
        }, {})
    }

    async updateGroup(group: IGroup): Promise<Record<IGroup['uuid'], IGroup>> {
        const response = await axios.put(`${this.baseURL}/groups/${group.uuid}`, group)
        return response.data
    }

    async createGroup(group: IGroup): Promise<Record<IGroup['uuid'], IGroup>> {
        const response = await axios.post(`${this.baseURL}/groups`, group)
        return response.data
    }
}