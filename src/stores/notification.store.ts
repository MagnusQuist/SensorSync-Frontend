import { defineStore } from 'pinia'

export interface Notification {
    message: string
    title: string
    type: NotificationType
    notifyTime: number
}

export enum NotificationType {
    Success = "border bg-background text-foreground",
    Error = "destructive group border-destructive bg-destructive text-destructive-foreground"
}

interface State {
    notifications: Notification[],
    notificationsArchive: Notification[],
}

export const useNotificationStore = defineStore('notify', {
    state: (): State => {
        return {
            notifications: [],
            notificationsArchive: [],
        }
    },
    actions: {
        notify(title: string, messageOrError: unknown, type: NotificationType) {
            let message: string = ""
            if (messageOrError instanceof Error) message = messageOrError.message
            if (typeof messageOrError === "string") message = messageOrError
            const notification: Notification = { title, message, type, notifyTime: Date.now() }
            this.notifications.push(notification)
            setTimeout(this.removeNotification.bind(this), 6000, notification)
        },
        removeNotification(notification: Notification) {
            this.notifications = this.notifications.filter(n => n.notifyTime != notification.notifyTime)
        }
    }
})