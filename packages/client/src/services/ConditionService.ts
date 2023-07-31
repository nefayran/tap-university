import type { ConditionStoreType } from '@/store/conditions'
import type { DivisionStoreType } from '@/store/divisions'
import type { NotificationStoreType } from '@/store/notifications'
import type { SubjectStoreType } from '@/store/subjects'
import type { ConditionBasic } from '@tap/server/out/models/domain/models/Condition'
import type { Store } from 'pinia'
import { type IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'

/**
 * Condition service layer for business logic implementation and stores aggregation.
 */
export class ConditionService {
  conditionStore: ConditionStoreType
  subjectStore: SubjectStoreType
  divisionStore: DivisionStoreType
  notificationStore: NotificationStoreType

  headers = [
    { title: 'Title', key: 'title', width: '20%' },
    { title: 'Type', key: 'type' },
    { title: 'Group By', key: 'groupBy' },
    { title: 'Operator', key: 'operator' },
    { title: 'Value', key: 'value', width: '10%' },
    { title: 'Actions', key: 'actions', sortable: false }
  ]

  titleRules = [
    (value: string) => {
      if (value) return true

      return 'Condition title is required.'
    },
    (value: string) => {
      if (value?.length <= 25) return true

      return 'Condition title must be less than 25 characters.'
    }
  ]

  valueRules = [
    (v: number) => !!v || 'This field is required',
    (v: number) => (v && v >= -1000) || 'Value should be above -1000',
    (v: number) => (v && v <= 1000) || 'Value should not be above 1000'
  ]

  isRequired = [
    (value: string) => {
      if (value) return true

      return 'Value is required.'
    }
  ]

  constructor(_conditionStore: Store, _subjectStore: Store, _divisionStore: Store, _notificationStore: Store) {
    this.conditionStore = _conditionStore as unknown as ConditionStoreType
    this.divisionStore = _divisionStore as unknown as DivisionStoreType
    this.subjectStore = _subjectStore as unknown as SubjectStoreType
    this.notificationStore = _notificationStore as unknown as NotificationStoreType
  }

  async Create(payload: { condition: ConditionBasic }) {
    const [error, data] = await this.conditionStore.createCondition([{ ...payload.condition }])
    if (data && data.response && data.response.errorCode) {
      this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: 'warning' })
      return null
    }
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Condition successfully created', type: 'success' })
    this.Load([])
  }

  GetGroups() {
    const divisions = this.divisionStore.Divisions.filter((d) => d.available).map((obj: any) => ({ ...obj, type: 'Division' }))
    const subjects = this.subjectStore.Subjects.map((obj: any) => ({ ...obj, type: 'Subject' }))
    const groups = [...divisions, ...subjects]
    const result = groups.map((obj: any) => ({ ...obj, title: `${obj.type}:${obj.title}` }))
    result.push({ _id: 'all', title: 'All' })
    return result
  }

  async Load(ids: []) {
    const [error, response] = await this.conditionStore.fetchCondition(ids)
    const result = response.map((obj: any) => ({ ...obj, editable: false }))
    this.conditionStore.Conditions = result
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Conditions successfully loaded', type: 'info' })
  }

  async Delete(deleteArray: IdsQuery['ids']) {
    const [error] = await this.conditionStore.deleteCondition(deleteArray)
    deleteArray = []
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Conditions successfully deleted', type: 'success' })
    this.Load([])
  }

  async PreLoad() {
    const [typesError, typesResponse] = await this.conditionStore.fetchTypes()
    this.conditionStore.Types = typesResponse
    const [operatorsError, operatorsResponse] = await this.conditionStore.fetchOperators()
    this.conditionStore.Operators = operatorsResponse

    const error = typesError ?? operatorsError
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'All information successfully pre-loaded', type: 'info' })
  }

  async Update(condition: ConditionBasic) {
    const [error, data] = await this.conditionStore.updateCondition(condition)
    if (data && data.response && data.response.errorCode) {
      this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: 'warning' })
      this.Load([])
      return null
    }
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.notificationStore.pushNotification({ text: 'Condition successfully updated', type: 'success' })
    this.Load([])
  }
}
