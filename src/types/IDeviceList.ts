import { IDevice } from "./IDevice"

export interface IDeviceList {
    devices: Record<IDevice['uuid'], IDevice>
}