import { IGroup } from "@/types/IGroup";

export default class devices {
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    allGroups: Record<IGroup['uuid'], IGroup> = {
        "7035d89e-f64a-4cc3-9756-50dde12544f3":
        {
            uuid: "7035d89e-f64a-4cc3-9756-50dde12544f3",
            name: "Default Group",
            location: "None",
            device_count: 1,
            editable: false
        },
        "f704bd0f-88cf-4b47-b0c8-826420b1b89a":
        {
            uuid: "f704bd0f-88cf-4b47-b0c8-826420b1b89a",
            name: "Security Devices",
            location: "Main Building",
            device_count: 3,
            editable: true
        }
    }
}