import { defineStore } from 'pinia'

import { putDivision, postDivision, getDivision, deleteDivision } from '@/api/divisions'

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
    async createDivision(payload: any) {
      const [error, response] = await postDivision(payload)
      return [error, response]
    },
    async deleteDivision(payload: any) {
      const [error, response] = await deleteDivision(payload)
      return [error, response]
    },
    async fetchDivision(payload: any) {
      const [error, response] = await getDivision(payload)
      return [error, response]
    },
    async updateDivision(payload: any) {
      const [error, response] = await putDivision(payload)
      return [error, response]
    }
  },
})
