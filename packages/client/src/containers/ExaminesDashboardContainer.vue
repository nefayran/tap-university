<template>
    <v-row>
      <v-col>
        <v-skeleton-loader v-if="loading" max-width="100%" min-height="100" type="table"></v-skeleton-loader>
        <v-data-table v-if="!loading" :headers="examineService.headers" :items="getExamines" class="elevation-0">
          <template v-slot:item="{ item }">
            <tr>
              <td v-for="column in examineService.headers" v-bind:key="column.key">
                <v-select
                  v-if="column.key === 'division'"
                  label="Select Division"
                  :items="getDivisions"
                  item-value="_id"
                  item-title="title"
                  :rules="subjectService.divisionRules"
                  v-model="item.raw.division._id"
                  required
                ></v-select>
                <v-text-field
                  v-if="column.type === 'subject'"
                  v-model="item.raw[column.key]"
                  variant="underlined"
                  type="number"
                  :rules="examineService.subjectsRules"
                ></v-text-field>
                <span v-if="(column.type === 'id')">
                  {{ `Examinee ${item.raw[column.key]}` }}
                </span>
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-col cols="3">
          <v-btn @click="pushRow()" density="default" icon="mdi-plus"></v-btn>
        </v-col>
      </v-col>
    </v-row>
    <!-- <DeleteDialog v-model="dialogDelete" @deleteSubmit="deleteSubmit" /> -->
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import DeleteDialog from '@/components/dialogs/DeleteDialog.vue'
  import { useExaminesStore } from '@/store/examines'
  import { useSubjectsStore } from '@/store/subjects'
  import { useNotificationsStore } from '@/store/notifications'
  import { useDivisionsStore } from '@/store/divisions'
  import type { IdsQuery } from '@tap/server/out/models/dtos/IdsQuery'
  import type { SubjectBasic } from '@tap/server/out/models/domain/models/Subject'
  import type { DivisionBasic } from '@tap/server/out/models/domain/models/Division'
import { ExamineService } from '@/services/ExamineService'
import { SubjectService } from '@/services/SubjectService'
import { DivisionService } from '@/services/DivisionService'
  
  // Store:
  const examinesStore = useExaminesStore()
  const subjectsStore = useSubjectsStore()
  const divisionsStore = useDivisionsStore()
  const notificationStore = useNotificationsStore()
  
  // Services:
  const divisionService = new DivisionService(divisionsStore, notificationStore)
  const examineService = new ExamineService(examinesStore, subjectsStore, divisionsStore, notificationStore)
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
  const pushRow = async() => {
    await examineService.Add()
  }
  // const submitForm = async () => {
  //   if (form.value) {
  //     const { valid } = await form.value.validate()
  //     if (valid) {
  //       loading.value = true
  //       subjectService.Create({ title: title.value, divisionId: divisionId.value })
  //       loading.value = false
  //     }
  //   }
  // }
  
  // const deleteSubmit = async (value: boolean) => {
  //   if (value) {
  //     loading.value = true
  //     subjectService.Delete(deleteSubjectArray)
  //     loading.value = false
  //   }
  // }
  
  // const submitUpdate = async (item: SubjectBasic & { editable: boolean; division: DivisionBasic }) => {
  //   item.editable = !item.editable
  //   currentEditId.value = null
  //   if (item) {
  //     loading.value = true
  //     subjectService.updateSubject(item)
  //     loading.value = false
  //   }
  // }
  
  // const deleteItem = (item: IdsQuery['ids']) => {
  //   deleteSubjectArray.value.push(item)
  //   dialogDelete.value = true
  // }
  
  // const updateItem = (item: SubjectBasic & { editable: boolean }) => {
  //   item.editable = !item.editable
  //   currentEditId.value = item._id
  // }
  
  // Getters:
  const getDivisions = computed(() => {
    return divisionsStore.getDivisions
  })
  
  const getExamines = computed(() => {
    return examinesStore.getExamines
  })
  
  onMounted(async () => {
    await divisionService.Load([])
    await subjectService.Load([])
    await examineService.Init()
    loading.value = false
  })
  </script>
  