<template>
  <slot></slot>
  <div class="notification-container">
    <v-slide-y-transition group>
        <v-alert
          class="mt-2"
          dense
          v-for="notification in getNotifications"
          v-bind:key="notification"
          :type="notification.type"
          dismissible
          dark
        >
          {{ notification.text }}
        </v-alert>
    </v-slide-y-transition>
  </div>
</template>

<style>
.notification-container {
    z-index: 999;
    position: absolute;
    width: 30vw;
    top: 10vh;
    right: 5vh;
}
</style>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import { useNotificationsStore, INotification } from '@/store/notifications'

// Store:
const store = useNotificationsStore()

// Getters:
const getNotifications: ComputedRef<Array<INotification>> = computed(() => {
  return store.getNotifications
})
</script>
