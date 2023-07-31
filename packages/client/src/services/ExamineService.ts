import type { ConditionStoreType } from '@/store/conditions'
import type { DivisionStoreType } from '@/store/divisions'
import type { ExamineStoreType } from '@/store/examines'
import type { NotificationStoreType } from '@/store/notifications'
import type { SubjectStoreType } from '@/store/subjects'
import type { ConditionBasic } from '@tap/server/out/models/domain/models/Condition'
import type { DivisionBasic } from '@tap/server/out/models/domain/models/Division'
import type { SubjectBasic } from '@tap/server/out/models/domain/models/Subject'
import type { ExamineBasic } from '@tap/server/out/models/domain/models/Examine'
import type { Store } from 'pinia'

/**
 * Examine service layer for business logic implementation and stores aggregation.
 */
export class ExamineService {
  conditionStore: ConditionStoreType
  subjectStore: SubjectStoreType
  divisionStore: DivisionStoreType
  notificationStore: NotificationStoreType
  examineStore: ExamineStoreType

  headers = [
    { title: 'ID', key: '_id', type: 'id', width: '10%' },
    { title: 'Division', key: 'division', type: 'select', width: '10%' }
  ]

  scoreRules = [
    (v: number) => !!v || 'This field is required',
    (v: number) => (v && v >= 0) || 'Score should be above 0',
    (v: number) => (v && v <= 100) || 'Score should not be above 100'
  ]

  divisionRules = [
    (value: string) => {
      if (value) return true

      return 'Division is required.'
    }
  ]

  constructor(_examineStore: Store, _conditionStore: Store, _subjectStore: Store, _divisionStore: Store, _notificationStore: Store) {
    this.examineStore = _examineStore as unknown as ExamineStoreType
    this.conditionStore = _conditionStore as unknown as ConditionStoreType
    this.divisionStore = _divisionStore as unknown as DivisionStoreType
    this.subjectStore = _subjectStore as unknown as SubjectStoreType
    this.notificationStore = _notificationStore as unknown as NotificationStoreType
  }

  Add() {
    const lastRow = this.examineStore.Examines[this.examineStore.Examines.length - 1]
    const row: ExamineBasic = {
      _id: (lastRow._id as number) + 1,
      division: { _id: '', title: '' } as DivisionBasic,
      result: null
    }
    this.subjectStore.Subjects.forEach((subject: SubjectBasic) => {
      row[subject._id] = 0
    })
    this.conditionStore.Conditions.forEach((condition: ConditionBasic) => {
      row[condition._id] = null
    })
    this.examineStore.pushExamine(row)
  }

  Init() {
    const zeroRow: ExamineBasic = {
      _id: 1,
      division: { _id: '', title: '' } as DivisionBasic,
      result: null
    }
    this.subjectStore.Subjects.forEach((subject: SubjectBasic) => {
      this.headers.push({ title: subject.title, key: subject._id, type: 'subject', width: '5%' })
      zeroRow[subject._id] = 0
    })
    this.conditionStore.Conditions.forEach((condition: ConditionBasic) => {
      this.headers.push({ title: condition.title, key: condition._id, type: 'condition', width: '5%' })
      zeroRow[condition._id] = null
    })
    this.headers.push({ title: 'Result', key: 'result', type: 'result', width: '5%' })

    if (this.examineStore.Examines.length === 0) {
      this.examineStore.pushExamine(zeroRow)
    }
  }

  async Calculate(examines: Array<ExamineBasic>) {
    const [error, data] = await this.examineStore.calculateExamines(examines)

    if (data && data.response && data.response.errorCode) {
      this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: 'warning' })
      return null
    }
    if (error) {
      this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
      return null
    }
    this.examineStore.Examines = data.examines
    this.notificationStore.pushNotification({ text: 'Examines successfully calculated', type: 'success' })
    return examines
  }
}
