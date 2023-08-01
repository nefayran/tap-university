<template>
  <v-layout>
    <v-responsive class="fill-height">
      <v-card class="mx-auto" :prepend-icon="icon">
        <template v-slot:title>Dashboards: {{ title }}</template>
        <slot></slot>
      </v-card>
    </v-responsive>
  </v-layout>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  icon: String
})
</script>
