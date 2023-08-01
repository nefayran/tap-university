<template>
  <v-row>
    <v-col>
      <v-progress-linear v-if="loading" indeterminate color="cyan"></v-progress-linear>
      <v-data-table v-if="!loading" :headers="examineService.headers" :items="getExamines" class="elevation-0">
        <template v-slot:item="{ item }">
          <tr>
            <td v-for="column in examineService.headers" v-bind:key="column.key">
              <v-select
                v-if="column.key === 'division'"
                label="Select Division"
                :items="divisionsStore.getDivisions.filter((d: DivisionBasic) => d.available)"
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
                :rules="examineService.scoreRules"
              ></v-text-field>
              <span v-if="column.type === 'condition'">
                {{ `${item.raw[column.key] ?? '-'}` }}
              </span>
              <span v-if="column.type === 'id'">
                {{ `Examinee ${item.raw[column.key]}` }}
              </span>
              <span v-if="column.type === 'result'">
                {{ `${item.raw[column.key]}` }}
              </span>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-row class="pt-2 pb-2 pl-2">
        <v-col cols="2">
          <v-btn @click="pushRow()" size="x-large" prepend-icon="mdi-plus">Add row</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn @click="calculate()" size="x-large" prepend-icon="mdi-calculator">Calculate</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style>
.v-data-table {
  overflow-x: auto;
  max-width: 100%;
}
</style>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useExaminesStore } from '@/store/examines'
import { useSubjectsStore } from '@/store/subjects'
import { useNotificationsStore } from '@/store/notifications'
import { useDivisionsStore } from '@/store/divisions'
import type { DivisionBasic } from '@tap/server/out/models/domain/models/Division'
import { ExamineService } from '@/services/ExamineService'
import { SubjectService } from '@/services/SubjectService'
import { DivisionService } from '@/services/DivisionService'
import { useConditionsStore } from '@/store/conditions'
import { ConditionService } from '@/services/ConditionService'

// Store:
const examinesStore = useExaminesStore()
const conditionsStore = useConditionsStore()
const subjectsStore = useSubjectsStore()
const divisionsStore = useDivisionsStore()
const notificationStore = useNotificationsStore()

// Services:
const divisionService = new DivisionService(divisionsStore, notificationStore)
const conditionService = new ConditionService(conditionsStore, subjectsStore, divisionsStore, notificationStore)
const examineService = new ExamineService(examinesStore, conditionsStore, subjectsStore, divisionsStore, notificationStore)
const subjectService = new SubjectService(subjectsStore, divisionsStore, notificationStore)

// Data:
const loading = ref(true)

// Methods:
const pushRow = async () => {
  await examineService.Add()
}

const calculate = async () => {
  await examineService.Calculate(examinesStore.getExamines)
}

const getExamines = computed(() => {
  return examinesStore.getExamines
})

onMounted(async () => {
  await conditionService.Load([])
  await divisionService.Load([])
  await subjectService.Load([])
  await examineService.Init()
  loading.value = false
})
</script>
