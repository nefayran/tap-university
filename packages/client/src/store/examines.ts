import { defineStore } from 'pinia'

// import { postSubject, getSubject, deleteSubject, putSubject } from '@/api/subject'
import { SubjectBasic } from '@tap/server/out/models/domain/models/Subject'
import type { IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
import type { APIResponse } from '@/api'
import type { CreateSubjectDto } from '@tap/server/out/models/dtos/CreateSubjectDto'
import type { UpdateSubjectDto } from '@tap/server/out/models/dtos/UpdateSubjectDto'
import type { DivisionBasic } from '@tap/server/out/models/domain/models/Division'

export interface ExamineBasic {
  _id: string;
  division: DivisionBasic;
  subjects: SubjectBasic[];
  result: "Pass" | "Fail";
}

export interface ExamineStoreType {
  Examines: Array<ExamineBasic>
  getExamines(): Array<ExamineBasic>
  pushExamine(payload: any): void
  // createSubject(payload: CreateSubjectDto['subjects']): Promise<APIResponse>
  // deleteSubject(payload: IdsQuery['ids']): Promise<APIResponse>
  // fetchSubject(payload: IdsQuery['ids']): Promise<APIResponse>
  // updateSubject(payload: UpdateSubjectDto['subject']): Promise<APIResponse>
}

export const useExaminesStore = defineStore('Examine', {
  state: () => ({
    Examines: <ExamineBasic[]>[]
  }),
  getters: {
    getExamines(state) {
      return state.Examines
    }
  },
  actions: {
    pushExamine(payload: ExamineBasic): void{
      this.Examines.push(payload);
      // const [error, response] = await postSubject(payload)
      // return [error, response]
    },
    // async deleteSubject(payload: IdsQuery['ids']) {
    //   const [error, response] = await deleteSubject(payload)
    //   return [error, response]
    // },
    // async fetchSubject(payload: IdsQuery['ids']) {
    //   const [error, response] = await getSubject(payload)
    //   return [error, response]
    // },
    // async updateSubject(payload: SubjectBasic) {
    //   const [error, response] = await putSubject(payload)
    //   return [error, response]
    // }
  }
})
