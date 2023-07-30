import { defineStore } from 'pinia'

export interface INotification {
  text: string
  type: 'success' | 'warning' | 'info' | 'warning' | 'error'
}

export interface NotificationStoreType {
  pushNotification(payload: INotification): void
  getNotifications(): Array<INotification>
}

export const useNotificationsStore = defineStore('Notifications', {
  state: () => ({
    notifications: [] as Array<INotification>
  }),
  getters: {
    getNotifications(state): Array<INotification> {
      return state.notifications
    }
  },
  actions: {
    async pushNotification(payload: INotification) {
      this.notifications.push(payload)
      setTimeout(() => {
        this.notifications.shift()
      }, 3000)
    }
  }
})
