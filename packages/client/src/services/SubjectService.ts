import type { DivisionStoreType } from '@/store/divisions'
import type { NotificationStoreType } from '@/store/notifications'
import type { SubjectStoreType } from '@/store/subjects'
import type { DivisionBasic } from '@tap/server/out/models/domain/models/Division'
import type { Store } from 'pinia'

/**
 * Subject service layer for business logic implementation and stores aggregation.
 */
export class SubjectService {
  subjectStore: SubjectStoreType
  divisionStore: DivisionStoreType
  notificationStore: NotificationStoreType

  titleRules = [
    (value: string) => {
      if (value) return true

      return 'Subject title is required.'
    },
    (value: string) => {
      if (value?.length <= 25) return true

      return 'Subject title must be less than 25 characters.'
    }
  ]

  divisionRules = [
    (value: string) => {
      if (value) return true

      return 'Division is required.'
    }
  ]

  constructor(_subjectStore: Store, _divisionStore: Store, _notificationStore: Store) {
    this.divisionStore = _divisionStore as unknown as DivisionStoreType
    this.subjectStore = _subjectStore as unknown as SubjectStoreType
    this.notificationStore = _notificationStore as unknown as NotificationStoreType
  }

  async Create(payload: { title: string; divisionId: DivisionBasic['_id'] }) {
    const [error, data] = await this.subjectStore.createSubject([{ title: payload.title, division: { _id: payload.divisionId} }])
    if (data && data.response && data.response.errorCode) {
      this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: 'warning' })
      return null
    }
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Subject successfully created', type: 'success' })
    this.Load([])
  }

  async Delete(deleteSubjectArray: any) {
    const [error] = await this.subjectStore.deleteSubject(deleteSubjectArray.value)
    deleteSubjectArray.value = []
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Subject successfully deleted', type: 'success' })
    this.Load([])
  }

  async Load(ids: []) {
    const [error, response] = await this.subjectStore.fetchSubject(ids)
    const result = response.map((obj: any) => ({ ...obj, editable: false }))
    this.subjectStore.Subjects = result
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Subjects successfully loaded', type: 'info' })
  }

  async updateSubject(subject: {}) {
    const [error, data] = await this.subjectStore.updateSubject(subject)
    if (data && data.response && data.response.errorCode) {
      this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: 'warning' })
      this.Load([])
      return null
    }
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Subjects successfully updated', type: 'success' })
    this.Load([])
  }
}
