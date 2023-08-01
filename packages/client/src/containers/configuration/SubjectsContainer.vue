<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-form ref="form">
            <h3 class="mb-3">Create new "Subject":</h3>
            <v-row>
              <v-col cols="3">
                <v-text-field v-model="title" :rules="subjectService.titleRules" :counter="25" label="Subject Title" required></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  label="Select Division"
                  :items="divisionsStore.getDivisions"
                  item-value="_id"
                  :rules="subjectService.divisionRules"
                  v-model="divisionId"
                  required
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-btn @click="submitForm" block rounded="2" size="x-large">Create</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <v-progress-linear v-if="loading" indeterminate color="cyan"></v-progress-linear>
      <v-data-table v-if="!loading" :headers="subjectService.headers" :items="subjectsStore.getSubjects" class="elevation-0">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            v-if="!item.raw.editable"
            class="mt-5 ml-3"
            density="comfortable"
            @click="updateItem(item.raw)"
            icon="mdi-pen"
            :disabled="!!currentEditId"
          ></v-btn>
          <v-btn
            v-if="item.raw.editable"
            class="mt-5 ml-3"
            density="comfortable"
            @click="submitUpdate(item.raw)"
            icon="mdi-send"
            :disabled="!currentEditId"
          ></v-btn>
          <v-btn class="mt-5 ml-3" density="comfortable" @click="deleteItem(item.raw)" icon="mdi-delete" :disabled="!!currentEditId"></v-btn>
        </template>
        <template v-slot:[`item.title`]="{ item }">
          <v-col>
            <v-row>
              <v-text-field
                v-model="item.raw.title"
                variant="underlined"
                :disabled="!item.raw.editable"
                :rules="subjectService.titleRules"
              ></v-text-field>
            </v-row>
          </v-col>
        </template>
        <template v-slot:[`item.division`]="{ item }">
          <v-col>
            <v-row>
              <v-select
                label="Select Division"
                :items="divisionsStore.getDivisions"
                item-value="_id"
                item-title="title"
                :rules="subjectService.divisionRules"
                v-model="item.raw.division._id"
                :disabled="!item.raw.editable"
                required
              ></v-select>
            </v-row>
          </v-col>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
  <DeleteDialog v-model="dialogDelete" @deleteSubmit="deleteSubmit" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DeleteDialog from '@/components/dialogs/DeleteDialog.vue'
import { useSubjectsStore } from '@/store/subjects'
import { useNotificationsStore } from '@/store/notifications'
import { useDivisionsStore } from '@/store/divisions'
import { SubjectService } from '@/services/SubjectService'
import type { IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
import type { SubjectBasic } from '@tap/server/out/models/domain/models/Subject'
import type { DivisionBasic } from '@tap/server/out/models/domain/models/Division'

// Store:
const subjectsStore = useSubjectsStore()
const divisionsStore = useDivisionsStore()
const notificationStore = useNotificationsStore()

// Services:
const subjectService = new SubjectService(subjectsStore, divisionsStore, notificationStore)

// Data:
const dialogDelete = ref(false)
const deleteSubjectArray = ref<any>([])
const title = ref('')
const divisionId = ref()
const form = ref<HTMLFormElement | null>(null)
const loading = ref(true)
const currentEditId = ref<string | null>(null)

// Methods:
const submitForm = async () => {
  if (form.value) {
    const { valid } = await form.value.validate()
    if (valid) {
      loading.value = true
      subjectService.Create({ title: title.value, divisionId: divisionId.value })
      loading.value = false
    }
  }
}

const deleteSubmit = async (value: boolean) => {
  if (value) {
    loading.value = true
    subjectService.Delete(deleteSubjectArray)
    loading.value = false
  }
}

const submitUpdate = async (item: SubjectBasic & { editable: boolean; division: DivisionBasic }) => {
  item.editable = !item.editable
  currentEditId.value = null
  if (item) {
    loading.value = true
    subjectService.Update(item)
    loading.value = false
  }
}

const deleteItem = (item: IdsQuery['ids']) => {
  deleteSubjectArray.value.push(item)
  dialogDelete.value = true
}

const updateItem = (item: SubjectBasic & { editable: boolean }) => {
  item.editable = !item.editable
  currentEditId.value = item._id
}

onMounted(() => {
  subjectService.Load([])
  loading.value = false
})
</script>
