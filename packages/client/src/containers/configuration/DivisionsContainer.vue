<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-form ref="form">
              <v-container>
                <h3 class="mb-3">Create new "Division":</h3>
                <v-row>
                  <v-col cols="3">
                    <v-text-field v-model="title" :rules="divisionService.titleRules" :counter="20" label="Division Title" required></v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-btn @click="submitForm" block rounded="2" size="x-large">Create</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-row>
        <v-skeleton-loader v-if="loading" max-width="100%" min-height="100" type="table"></v-skeleton-loader>
        <v-data-table :headers="headers" :items="getDivisions" class="elevation-0">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              v-if="!item.raw.editable"
              class="mt-5 ml-3"
              density="comfortable"
              @click="updateItem(item.raw)"
              icon="mdi-pen"
              :disabled="currentEditTitle"
            ></v-btn>
            <v-btn
              v-if="item.raw.editable"
              class="mt-5 ml-3"
              density="comfortable"
              @click="submitUpdate(item.raw)"
              icon="mdi-send"
              :disabled="!currentEditTitle"
            ></v-btn>
            <v-btn class="mt-5 ml-3" density="comfortable" @click="deleteItem(item.raw)" icon="mdi-delete" :disabled="currentEditTitle"></v-btn>
          </template>
          <template v-slot:[`item.title`]="{ item }">
            <v-col>
              <v-row>
                <v-text-field
                  v-model="item.raw.title"
                  variant="underlined"
                  :disabled="!item.raw.editable"
                  :rules="divisionService.titleRules"
                ></v-text-field>
              </v-row>
            </v-col>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <DeleteDialog v-model="dialogDelete" @deleteSubmit="deleteSubmit" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import DeleteDialog from '@/components/dialogs/DeleteDialog.vue'
import { useDivisionsStore } from '@/store/divisions'
import { useNotificationsStore } from '@/store/notifications'
import { DivisionService } from '@/services/DivisionService'

// Store:
const store = useDivisionsStore()
const notificationStore = useNotificationsStore()

// Services:
const divisionService = new DivisionService(store, notificationStore)

// Data:
const dialogDelete = ref(false)
const deleteDivisionArray = ref<any>([])
const title = ref('')
const form = ref<HTMLFormElement | null>(null)
const loading = ref(true)
const currentEditTitle = ref<string | null>(null)
const headers = [
  { title: 'ID', key: '_id' },
  { title: 'Title', key: 'title' },
  { title: 'Subjects', key: 'subjects' },
  { title: 'Actions', key: 'actions', sortable: false }
]

// Methods:
const submitForm = async () => {
  if (form.value) {
    const { valid } = await form.value.validate()
    if (valid) {
      loading.value = true
      divisionService.createDivision(title.value)
      loading.value = false
    }
  }
}

const deleteSubmit = async (value) => {
  if (value) {
    loading.value = true
    divisionService.deleteDivision(deleteDivisionArray)
    loading.value = false
  }
}

const submitUpdate = async (item) => {
  item.editable = !item.editable
  currentEditTitle.value = null
  if (item) {
    loading.value = true
    console.log(item)
    divisionService.updateDivision(item)
    loading.value = false
  }
}

const deleteItem = (item) => {
  deleteDivisionArray.value.push(item)
  dialogDelete.value = true
}

const updateItem = (item) => {
  item.editable = !item.editable
  currentEditTitle.value = item.title
}

// Getters:
const getDivisions = computed(() => {
  return store.getDivisions
})

onMounted(() => {
  divisionService.fetchDivision([])
  loading.value = false
})
</script>
