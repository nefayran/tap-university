import { defineStore } from 'pinia'

import { getSubjectByIds } from '@/api/subject'

export const useSubjectStore = defineStore('subject', {
  state: () => ({
    subjects: []
  }),
  getters: {
    getSubjects(state) {
      return state.subjects
    }
  },
  actions: {
    async fetchSubjects() {
      const [error, subjects] = await getSubjectByIds([])
      this.subjects = subjects
    }
  }
})
