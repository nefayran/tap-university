import type { DivisionStoreType } from '@/store/divisions'
import type { ExamineBasic, ExamineStoreType } from '@/store/examines'
import type { NotificationStoreType } from '@/store/notifications'
import type { SubjectStoreType } from '@/store/subjects'
import type { DivisionBasic } from '@tap/server/out/models/domain/models/Division'
import type { SubjectBasic } from '@tap/server/out/models/domain/models/Subject'
import type { Store } from 'pinia'

interface ExamineMap {
  [key: string]: string | number | DivisionBasic | null | undefined
}

/**
 * Examine service layer for business logic implementation and stores aggregation.
 */
export class ExamineService {
  subjectStore: SubjectStoreType
  divisionStore: DivisionStoreType
  notificationStore: NotificationStoreType
  examineStore: ExamineStoreType

  headers = [
    { title: 'ID', key: '_id', type: 'id' },
    { title: 'Division', key: 'division', type: 'select'},
  ]

  subjectsRules = [ 
    (v: number) => !!v || "This field is required",
    (v: number) => ( v && v >= 0 ) || "Score should be above 0",
    (v: number) => ( v && v <= 100 ) || "Score should not be above 100",
  ]

  divisionRules = [
    (value: string) => {
      if (value) return true

      return 'Division is required.'
    }
  ]

  constructor(_examineStore: Store, _subjectStore: Store, _divisionStore: Store, _notificationStore: Store) {
    this.examineStore = _examineStore as unknown as ExamineStoreType
    this.divisionStore = _divisionStore as unknown as DivisionStoreType
    this.subjectStore = _subjectStore as unknown as SubjectStoreType
    this.notificationStore = _notificationStore as unknown as NotificationStoreType
  }

  Add() {
    const lastRow = this.examineStore.Examines[this.examineStore.Examines.length - 1];
    const row: ExamineMap = {
      _id: lastRow._id + 1,
      division: { _id: '', title: ''} as DivisionBasic,
      result: null
    }
    this.subjectStore.Subjects.forEach((subject: SubjectBasic) => {
      row[subject._id] = 0;
    });
    this.examineStore.pushExamine(row)
  }

  Init() {
    const zeroRow: ExamineMap  = {
      _id: 1,
      division: { _id: '', title: ''} as DivisionBasic,
      result: null
    }
    this.subjectStore.Subjects.forEach((subject: SubjectBasic) => {
      this.headers.push( { title: subject.title, key: subject._id, type:  "subject" },)
      zeroRow[subject._id] = 0;
    });
    this.headers.push( { title: "Result", key: "result", type:  "result" },)

    if(this.examineStore.Examines.length === 0) {
      this.examineStore.pushExamine(zeroRow)
    }
  }

  // async Create(payload: { title: string; divisionId: DivisionBasic['_id'] }) {
  //   const [error, data] = await this.subjectStore.createSubject([{ title: payload.title, division: { _id: payload.divisionId} }])
  //   if (data && data.response && data.response.errorCode) {
  //     this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: 'warning' })
  //     return null
  //   }
  //   if (error) {
  //     this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
  //     return null
  //   }
  //   this.notificationStore.pushNotification({ text: 'Subject successfully created', type: 'success' })
  //   this.Load([])
  // }

  // async Delete(deleteSubjectArray: any) {
  //   const [error] = await this.subjectStore.deleteSubject(deleteSubjectArray.value)
  //   deleteSubjectArray.value = []
  //   if (error) {
  //     this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
  //     return null
  //   }
  //   this.notificationStore.pushNotification({ text: 'Subject successfully deleted', type: 'success' })
  //   this.Load([])
  // }

  // async Load(ids: []) {
  //   const [error, response] = await this.subjectStore.fetchSubject(ids)
  //   const result = response.map((obj: any) => ({ ...obj, editable: false }))
  //   this.subjectStore.Subjects = result
  //   if (error) {
  //     this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
  //     return null
  //   }
  //   this.notificationStore.pushNotification({ text: 'Subjects successfully loaded', type: 'info' })
  // }

  // async updateSubject(subject: {}) {
  //   const [error, data] = await this.subjectStore.updateSubject(subject)
  //   if (data && data.response && data.response.errorCode) {
  //     this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: 'warning' })
  //     this.Load([])
  //     return null
  //   }
  //   if (error) {
  //     this.notificationStore.pushNotification({ text: `Error: ${error}`, type: 'error' })
  //     return null
  //   }
  //   this.notificationStore.pushNotification({ text: 'Subjects successfully updated', type: 'success' })
  //   this.Load([])
  // }
}
