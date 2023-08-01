<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-form ref="form">
            <h3 class="mb-3">Create new "Division":</h3>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="division.title"
                  :rules="divisionService.titleRules"
                  :counter="20"
                  label="Division Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-checkbox v-model="division.available" label="Available"></v-checkbox>
              </v-col>
              <v-col cols="2">
                <v-btn @click="submitForm" block rounded="2" size="x-large">Create</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <v-progress-linear v-if="loading" indeterminate color="cyan"></v-progress-linear>
      <v-data-table v-if="!loading" :headers="divisionService.headers" :items="divisionsStore.getDivisions" class="elevation-0">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            v-if="!item.raw.editable"
            class="mt-5 ml-3"
            density="comfortable"
            @click="updateItem(item.raw)"
            icon="mdi-pen"
            :disabled="!!currentEditTitle"
          ></v-btn>
          <v-btn
            v-if="item.raw.editable"
            class="mt-5 ml-3"
            density="comfortable"
            @click="submitUpdate(item.raw)"
            icon="mdi-send"
            :disabled="!currentEditTitle"
          ></v-btn>
          <v-btn class="mt-5 ml-3" density="comfortable" @click="deleteItem(item.raw)" icon="mdi-delete" :disabled="!!currentEditTitle"></v-btn>
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
        <template v-slot:[`item.available`]="{ item }">
          <v-col>
            <v-row>
              <v-checkbox v-model="item.raw.available" :disabled="!item.raw.editable" label="Available"></v-checkbox>
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
import { useDivisionsStore } from '@/store/divisions'
import { useNotificationsStore } from '@/store/notifications'
import { DivisionService } from '@/services/DivisionService'
import type { IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
import type { DivisionBasic } from '@tap/server/out/models/domain/models/Division'

// Store:
const divisionsStore = useDivisionsStore()
const notificationStore = useNotificationsStore()

// Services:
const divisionService = new DivisionService(divisionsStore, notificationStore)

// Data:
const dialogDelete = ref(false)
const deleteDivisionArray = ref<IdsQuery['ids']>([])
const division = ref({ title: null, available: true })
const form = ref<HTMLFormElement | null>(null)
const loading = ref(true)
const currentEditTitle = ref<string | null>(null)

// Methods:
const submitForm = async () => {
  if (form.value) {
    const { valid } = await form.value.validate()
    if (valid) {
      loading.value = true
      divisionService.Create(division.value as unknown as DivisionBasic)
      loading.value = false
    }
  }
}

const deleteSubmit = async (value: boolean) => {
  if (value) {
    loading.value = true
    divisionService.Delete(deleteDivisionArray.value)
    loading.value = false
  }
}

const submitUpdate = async (item: DivisionBasic & { editable: boolean }) => {
  item.editable = !item.editable
  currentEditTitle.value = null
  if (item) {
    loading.value = true
    divisionService.Update(item)
    loading.value = false
  }
}

const deleteItem = (item: string) => {
  deleteDivisionArray.value.push(item)
  dialogDelete.value = true
}

const updateItem = (item: DivisionBasic & { editable: boolean }) => {
  item.editable = !item.editable
  currentEditTitle.value = item.title
}

onMounted(async () => {
  await divisionService.Load([])
  loading.value = false
})
</script>
