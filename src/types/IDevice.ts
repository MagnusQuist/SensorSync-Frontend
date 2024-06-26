export interface IDevice {
    uuid: string
    name: string
    online: boolean
    athena_version: string
    toit_firmware_version: string
    group_uuid: string
    last_ping: Date
    ip_address: string
    jaguar_port: number
}