export interface IDevice {
    uuid: string
    name: string
    online: boolean
    athena_version: string
    toit_firmware_version: string
    group: string
    last_ping: Date
}