import { type IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
import { type DivisionStoreType } from '@/store/divisions'
import type { NotificationStoreType } from '@/store/notifications'
import type { UpdateDivisionDto } from '@tap/server/out/models/dtos/UpdateDivisionDto'
import type { Store } from 'pinia'
import type { DivisionBasic } from '@tap/server/out/models/domain/models/Division'

/**
 * Division service layer for business logic implementation and stores aggregation.
 */
export class DivisionService {
  divisionStore: DivisionStoreType
  notificationStore: NotificationStoreType

  headers = [
    { title: 'ID', key: '_id', width: '10%' },
    { title: 'Title', key: 'title' },
    { title: 'Available', key: 'available' },
    { title: 'Actions', key: 'actions', sortable: false }
  ]

  titleRules = [
    (value: string) => {
      if (value) return true

      return 'Division title is required.'
    },
    (value: string) => {
      if (value?.length <= 20) return true

      return 'Division title must be less than 20 characters.'
    }
  ]

  constructor(_divisionStore: Store, _notificationStore: Store) {
    this.divisionStore = _divisionStore as unknown as DivisionStoreType
    this.notificationStore = _notificationStore as unknown as NotificationStoreType
  }

  async Create(division: DivisionBasic) {
    const [error, data] = await this.divisionStore.createDivision([division])
    if (data && data.response && data.response.errorCode) {
      this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: 'warning' })
      return null
    }
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Division successfully created', type: 'success' })
    this.Load([])
  }

  async Delete(deleteDivisionArray: IdsQuery['ids']) {
    const [error] = await this.divisionStore.deleteDivision(deleteDivisionArray)
    deleteDivisionArray = []
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Division successfully deleted', type: 'success' })
    this.Load([])
  }

  async Load(ids: []) {
    const [error, response] = await this.divisionStore.fetchDivision(ids)
    const result = response.map((obj: DivisionBasic) => ({ ...obj, editable: false }))
    this.divisionStore.Divisions = result
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Divisions successfully loaded', type: 'info' })
  }

  async Update(division: UpdateDivisionDto['division']) {
    const [error, data] = await this.divisionStore.updateDivision(division)
    if (data && data.response && data.response.errorCode) {
      this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: 'warning' })
      this.Load([])
      return null
    }
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Divisions successfully updated', type: 'success' })
    this.Load([])
  }
}
