import { defineStore } from 'pinia'

import { calculateExamines } from '@/api/examine'
import type { APIResponse } from '@/api'
import type { ExamineBasic } from '@tap/server/out/models/domain/models/Examine'

export interface ExamineStoreType {
  Examines: Array<ExamineBasic>
  getExamines(): Array<ExamineBasic>
  pushExamine(payload: ExamineBasic): void
  calculateExamines(payload: Array<ExamineBasic>): Promise<APIResponse>
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
    pushExamine(payload: ExamineBasic): void {
      this.Examines.push(payload)
    },
    async calculateExamines(payload: Array<ExamineBasic>) {
      const [error, response] = await calculateExamines(payload)
      return [error, response]
    }
  }
})
