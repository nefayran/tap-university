import { defineStore } from 'pinia'

import { getTypes, getOperators, postCondition, getCondition, deleteCondition, putCondition } from '@/api/condition'
import { ConditionBasic } from '@tap/server/out/models/domain/models/Condition'
import type { IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
import type { APIResponse } from '@/api'
import type { CreateConditionDto } from '@tap/server/out/models/dtos/CreateConditionDto'
import type { UpdateConditionDto } from '@tap/server/out/models/dtos/UpdateConditionDto'

export interface ConditionStoreType {
  Conditions: Array<ConditionBasic>
  Types: []
  Operators: []
  fetchTypes(): any
  fetchOperators(): any
  getConditions(): Array<ConditionBasic>
  createCondition(payload: CreateConditionDto['conditions']): Promise<APIResponse>
  deleteCondition(payload: IdsQuery['ids']): Promise<APIResponse>
  fetchCondition(payload: IdsQuery['ids']): Promise<APIResponse>
  updateCondition(payload: UpdateConditionDto['Condition']): Promise<APIResponse>
}

export const useConditionsStore = defineStore('Condition', {
  state: () => ({
    Conditions: [],
    Types: [],
    Operators: [],
    Groups: []
  }),
  getters: {
    getTypes(state) {
      return state.Types
    },
    getOperators(state) {
      return state.Operators
    },
    getConditions(state) {
      return state.Conditions
    }
  },
  actions: {
    async createCondition(payload: CreateConditionDto['conditions']) {
      const [error, response] = await postCondition(payload)
      return [error, response]
    },
    async deleteCondition(payload: IdsQuery['ids']) {
      const [error, response] = await deleteCondition(payload)
      return [error, response]
    },
    async fetchTypes() {
      const [error, response] = await getTypes()
      return [error, response]
    },
    async fetchOperators() {
      const [error, response] = await getOperators()
      return [error, response]
    },
    async fetchCondition(payload: IdsQuery['ids']) {
      const [error, response] = await getCondition(payload)
      return [error, response]
    },
    async updateCondition(payload: ConditionBasic) {
      const [error, response] = await putCondition(payload)
      return [error, response]
    }
  }
})
