<template>
    <div class="hidden flex-col md:flex">
        <div class="flex-1 space-y-8 p-8 pt-6">
            <div class="flex flex-col items-left space-y-2">
                <h2 class="text-3xl font-bold tracking-light">
                    Device Setup
                </h2>
            </div>
            <div class="flex flex-col items-left space-y-4">
                <h4 class="text-xl font-semibold">Prerequisites</h4>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card class="rounded-sm shadow-sm">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">
                                <Badge variant="outline">CLI Tool</Badge>
                            </CardTitle>
                            <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-xl font-bold mb-2">
                                Jaguar CLI
                            </div>
                            <p class="text-sm text-slate-700">
                                The Jaguar CLI tool is needed to communicate and flash the devices.
                                Install it by running the command below in a terminal.
                            </p>
                            <Code code="yay install jaguar-bin" :is-multiline="false" class="my-3"></Code>
                            <p class="text-sm text-slate-700">
                                Visit the official Toit docs for more information:
                                <a href="https://docs.toit.io/getstarted/device" target="_blank"
                                    class="text-blue-400">Toit
                                    Documentation</a>
                            </p>
                        </CardContent>
                    </Card>
                    <Card class="rounded-sm shadow-sm">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">
                                <Badge variant="outline">Wifi Configuration</Badge>
                            </CardTitle>
                            <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-xl font-bold mb-2">
                                Host and Device Network
                            </div>
                            <p class="text-sm text-slate-700">
                                To allow the Fleet Management server to communicate with devices, they need to share the
                                same network.
                            </p>
                            <p class="text-sm text-slate-700 mt-2">
                                This means that you'll need to know the network credentials for the network, on which
                                the
                                fleet management server is running.
                            </p>
                        </CardContent>
                    </Card>
                    <Card class="rounded-sm shadow-sm">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">
                                <Badge variant="outline">Firmware</Badge>
                            </CardTitle>
                            <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-xl font-bold mb-2">
                                Latest ATHENA Firmware
                            </div>
                            <p class="text-sm text-slate-700">
                                You will need to download the latest release of the ATHENA Firmware from GitHub. This
                                firmware will be flashed onto the device, and handle all lifecycle data for each device.
                            </p>
                            <p class="text-sm text-slate-700 mt-3">
                                See all available releases on GitHub:
                                <a href="https://github.com/Helleberg/SensorSync-AthenaContainer/releases"
                                    target="_blank" class="text-blue-400">ATHENA Releases</a>
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <h4 class="text-xl font-semibold">Connect a Device</h4>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <Card class="rounded-sm shadow-sm">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">
                                <Badge variant="outline">STEP ONE</Badge>
                            </CardTitle>
                            <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-xl font-bold mb-2">
                                Flash Your Device
                            </div>
                            <p class="text-sm text-slate-700">
                                Connect the device to your computer with a serial cable and put the Jaguar application
                                onto it. It will ask your for the serial port to use and the WiFi credenrtials.
                            </p>
                            <Code code="jag flash" :is-multiline="false" class="my-3"></Code>
                            <p class="text-sm text-slate-700">
                                After flashing, the device should boot up and start the Toit virtual machine. You can
                                follow the progress by monitoring the serial output of the device:
                            </p>
                            <Code code="jag monitor" :is-multiline="false" class="my-3"></Code>
                        </CardContent>
                    </Card>
                    <Card class="rounded-sm shadow-sm">
                        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle class="text-sm font-medium">
                                <Badge variant="outline">STEP TWO</Badge>
                            </CardTitle>
                            <Icon icon="material-symbols-light:device-hub-rounded" class="size-6" />
                        </CardHeader>
                        <CardContent>
                            <div class="text-xl font-bold mb-2">
                                Install ATHENA Container
                            </div>
                            <p class="text-sm text-slate-700">
                                To allow the device to talk with the Fleet Management system you will need to install a
                                container onto the device. Having downloaded the latest release of the ATHENA Firmware,
                                you can install it onto the device using the following command:
                            </p>
                            <Code code="jag container install ATHENA path_to_athena.toit" :is-multiline="false"
                                class="my-3"></Code>
                            <p class="text-sm mt-3 text-slate-700">
                                The device will start the container automatically and connect to the Fleet Management
                                Server. Congratulations, you have successfully connected a device!
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import Code from '@/components/code/Code.vue'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
</script>

<style scoped></style>
