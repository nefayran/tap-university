<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <v-skeleton-loader v-if="loading" max-width="100%" min-height="100" type="table"></v-skeleton-loader>
          <v-form ref="form" v-if="!loading">
            <h3 class="mb-3">Create new "Condition":</h3>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="condition.title"
                  :rules="conditionService.titleRules"
                  :counter="25"
                  label="Condition Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  label="Select Type"
                  :items="conditionsStore.getTypes"
                  :rules="conditionService.isRequired"
                  v-model="condition.type"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-select
                  v-if="conditionService.GetGroups()"
                  label="Select Group By"
                  item-value="_id"
                  :items="conditionService.GetGroups()"
                  :rules="conditionService.isRequired"
                  v-model="condition.groupBy"
                  required
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  label="Select Operator"
                  :items="conditionsStore.getOperators"
                  :rules="conditionService.isRequired"
                  v-model="condition.operator"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-text-field v-model="condition.value" label="Value" required :rules="conditionService.valueRules" type="number"></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn @click="submitForm" block rounded="2" size="x-large">Create</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <v-skeleton-loader v-if="loading" max-width="100%" min-height="100" type="table"></v-skeleton-loader>
      <v-data-table v-if="!loading" :headers="conditionService.headers" :items="conditionsStore.getConditions" class="elevation-0">
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
                :rules="conditionService.titleRules"
              ></v-text-field>
            </v-row>
          </v-col>
        </template>
        <template v-slot:[`item.type`]="{ item }">
          <v-col>
            <v-row>
              <v-select
                label="Select Type"
                :items="conditionsStore.getTypes"
                :rules="conditionService.isRequired"
                v-model="item.raw.type"
                required
                :disabled="!item.raw.editable"
              ></v-select>
            </v-row>
          </v-col>
        </template>
        <template v-slot:[`item.groupBy`]="{ item }">
          <v-col>
            <v-row>
              <v-select
                v-if="conditionService.GetGroups()"
                label="Select Group By"
                item-value="_id"
                :items="conditionService.GetGroups()"
                :rules="conditionService.isRequired"
                v-model="item.raw.groupBy"
                required
                :disabled="!item.raw.editable"
              ></v-select>
            </v-row>
          </v-col>
        </template>
        <template v-slot:[`item.operator`]="{ item }">
          <v-col>
            <v-row>
              <v-select
                label="Select Operator"
                :items="conditionsStore.getOperators"
                :rules="conditionService.isRequired"
                v-model="item.raw.operator"
                :disabled="!item.raw.editable"
                required
              ></v-select>
            </v-row>
          </v-col>
        </template>
        <template v-slot:[`item.value`]="{ item }">
          <v-col>
            <v-row>
              <v-text-field
                v-model="item.raw.value"
                variant="underlined"
                :disabled="!item.raw.editable"
                :rules="conditionService.valueRules"
                type="number"
              ></v-text-field>
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
import { ConditionService } from '@/services/ConditionService'
import { useConditionsStore } from '@/store/conditions'
import { DivisionService } from '@/services/DivisionService'
import type { ConditionBasic } from '@tap/server/out/models/domain/models/Condition'

// Store:
const conditionsStore = useConditionsStore()
const subjectsStore = useSubjectsStore()
const divisionsStore = useDivisionsStore()
const notificationStore = useNotificationsStore()

// Services:
const subjectService = new SubjectService(subjectsStore, divisionsStore, notificationStore)
const divisionService = new DivisionService(divisionsStore, notificationStore)
const conditionService = new ConditionService(conditionsStore, subjectsStore, divisionsStore, notificationStore)

// Data:
const dialogDelete = ref(false)
const deleteArray = ref<any>([])
const condition = ref({ title: null, type: null, groupBy: null, operator: null, value: null })
const form = ref<HTMLFormElement | null>(null)
const loading = ref(true)
const currentEditId = ref<string | null>(null)

// Methods:
const submitForm = async () => {
  if (form.value) {
    const { valid } = await form.value.validate()
    if (valid) {
      loading.value = true
      conditionService.Create({ condition: condition.value as unknown as ConditionBasic })
      loading.value = false
    }
  }
}

const deleteSubmit = async (value: boolean) => {
  if (value) {
    loading.value = true
    conditionService.Delete(deleteArray.value)
    loading.value = false
  }
}

const submitUpdate = async (item: ConditionBasic & { editable: boolean }) => {
  item.editable = !item.editable
  currentEditId.value = null
  if (item) {
    loading.value = true
    conditionService.Update(item)
    loading.value = false
  }
}

const deleteItem = (item: IdsQuery['ids']) => {
  deleteArray.value.push(item)
  dialogDelete.value = true
}

const updateItem = (item: ConditionBasic & { editable: boolean }) => {
  item.editable = !item.editable
  currentEditId.value = item._id
}

onMounted(async () => {
  await divisionService.Load([])
  await subjectService.Load([])
  await conditionService.PreLoad()
  await conditionService.Load([])
  loading.value = false
})
</script>
