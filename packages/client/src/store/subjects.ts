import { defineStore } from 'pinia'

import { postSubject, getSubject, deleteSubject, putSubject } from '@/api/subject'
import { SubjectBasic } from '@tap/server/out/models/domain/models/Subject'
import type { IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
import type { APIResponse } from '@/api'
import type { CreateSubjectDto } from '@tap/server/out/models/dtos/CreateSubjectDto'
import type { UpdateSubjectDto } from '@tap/server/out/models/dtos/UpdateSubjectDto'

export interface SubjectStoreType {
  Subjects: Array<SubjectBasic>
  getSubjects(): Array<SubjectBasic>
  createSubject(payload: CreateSubjectDto['subjects']): Promise<APIResponse>
  deleteSubject(payload: IdsQuery['ids']): Promise<APIResponse>
  fetchSubject(payload: IdsQuery['ids']): Promise<APIResponse>
  updateSubject(payload: UpdateSubjectDto['subject']): Promise<APIResponse>
}

export const useSubjectsStore = defineStore('Subject', {
  state: () => ({
    Subjects: []
  }),
  getters: {
    getSubjects(state) {
      return state.Subjects
    }
  },
  actions: {
    async createSubject(payload: CreateSubjectDto['subjects']) {
      const [error, response] = await postSubject(payload)
      return [error, response]
    },
    async deleteSubject(payload: IdsQuery['ids']) {
      const [error, response] = await deleteSubject(payload)
      return [error, response]
    },
    async fetchSubject(payload: IdsQuery['ids']) {
      const [error, response] = await getSubject(payload)
      return [error, response]
    },
    async updateSubject(payload: SubjectBasic) {
      const [error, response] = await putSubject(payload)
      return [error, response]
    }
  }
})
