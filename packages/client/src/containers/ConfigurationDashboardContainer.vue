<template>
  <v-card width="100%">
    <v-tabs v-model="tab">
      <v-tab value="one">Divisions</v-tab>
      <v-tab value="two">Subjects</v-tab>
      <v-tab value="three">Conditions</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <DivisionsContainer />
        </v-window-item>

        <v-window-item value="two">
          <SubjectsContainer />
        </v-window-item>

        <v-window-item value="three">
          <ConditionsContainer />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DivisionsContainer from './configuration/DivisionsContainer.vue'
import SubjectsContainer from './configuration/SubjectsContainer.vue'
import ConditionsContainer from './configuration/ConditionsContainer.vue'

const tab = ref(0)
</script>
