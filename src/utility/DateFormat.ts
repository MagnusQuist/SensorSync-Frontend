import { formatDate } from '@vueuse/core'

export function DateFormat(date: Date): string {
    return formatDate(new Date(date), 'DD-MM-YY HH:mm:ss')
}