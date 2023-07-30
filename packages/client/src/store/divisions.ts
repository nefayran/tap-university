import { defineStore } from 'pinia'

import { putDivision, postDivision, getDivision, deleteDivision } from '@/api/divisions'
import { type CreateDivisionDto } from '@tap/server/out/models/dtos/CreateDivisionDto'
import { DivisionBasic } from '@tap/server/out/models/domain/models/Division'
import type { IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
import type { APIResponse } from '@/api'
import type { UpdateDivisionDto } from '@tap/server/out/models/dtos/UpdateDivisionDto'

export interface DivisionStoreType {
  Divisions: Array<DivisionBasic>
  getDivisions(): Array<DivisionBasic>
  createDivision(payload: CreateDivisionDto['divisions']): Promise<APIResponse>
  deleteDivision(payload: IdsQuery['ids']): Promise<APIResponse>
  fetchDivision(payload: IdsQuery['ids']): Promise<APIResponse>
  updateDivision(payload: UpdateDivisionDto['division']): Promise<APIResponse>
}

export const useDivisionsStore = defineStore('Division', {
  state: () => ({
    Divisions: []
  }),
  getters: {
    getDivisions(state) {
      return state.Divisions
    }
  },
  actions: {
    async createDivision(payload: CreateDivisionDto['divisions']) {
      const [error, response] = await postDivision(payload)
      return [error, response]
    },
    async deleteDivision(payload: IdsQuery['ids']) {
      const [error, response] = await deleteDivision(payload)
      return [error, response]
    },
    async fetchDivision(payload: IdsQuery['ids']) {
      const [error, response] = await getDivision(payload)
      return [error, response]
    },
    async updateDivision(payload: DivisionBasic) {
      const [error, response] = await putDivision(payload)
      return [error, response]
    }
  }
})
