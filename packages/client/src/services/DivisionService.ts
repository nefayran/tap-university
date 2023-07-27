/**
 * Division service layer for business logic implementation and stores aggregation.
 */
export class DivisionService {
    divisionStore: any;
    notificationStore: any;

    titleRules = [
        (value: string) => {
          if (value) return true
      
          return 'Division title is required.'
        },
        (value: string) => {
          if (value?.length <= 20) return true
      
          return 'Division title must be less than 20 characters.'
        }
      ]

    constructor(_divisionStore: any, _notificationStore: any) {
        this.divisionStore = _divisionStore;
        this.notificationStore = _notificationStore
    }

    async createDivision(title: string) {
        const [error, data] = await this.divisionStore.createDivision([{ title: title }])
        if(data && data.response && data.response.errorCode) {
            this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: "warning"})
            return null;
        }
        if(error) {
            this.notificationStore.pushNotification({ text: `Error: ${error}`, type: "error"})
            return null;
        }
        this.notificationStore.pushNotification({ text: "Division successfully created", type: "success"})
        this.fetchDivision([])
    }

    async deleteDivision(deleteDivisionArray: any) {
        const [error, ] = await this.divisionStore.deleteDivision(deleteDivisionArray.value)
        deleteDivisionArray.value = []
        if(error) {
            this.notificationStore.pushNotification({ text: `Error: ${error}`, type: "error"})
            return null;
        }
        this.notificationStore.pushNotification({ text: "Division successfully deleted", type: "success"})
        this.fetchDivision([])
    }

    async fetchDivision(ids: []) {
        const [error, response] = await this.divisionStore.fetchDivision(ids)
        const result = response.map((obj: any) => ({ ...obj, editable: false }))
        this.divisionStore.Divisions = result;
        if(error) {
            this.notificationStore.pushNotification({ text: `Error: ${ error}`, type: "error"})
            return null;
        }
        this.notificationStore.pushNotification({ text: "Divisions successfully loaded", type: "info"})
    }
    
    async updateDivision(division: {}) {
        const [error, data] = await this.divisionStore.updateDivision(division)
        if(data && data.response && data.response.errorCode) {
            this.notificationStore.pushNotification({ text: `Warning: ${data.response.message}`, type: "warning"})
            this.fetchDivision([])
            return null;
        }
        if(error) {
            this.notificationStore.pushNotification({ text: `Error: ${ error}`, type: "error"})
            return null;
        }
        this.notificationStore.pushNotification({ text: "Divisions successfully updated", type: "success"})
        this.fetchDivision([])
    }
}