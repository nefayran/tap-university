<template>
  <slot></slot>
  <div class="notification-container">
    <v-slide-y-transition group>
      <v-alert class="mt-2" dense v-for="(notification, index) in getNotifications" v-bind:key="index" :type="notification.type" dismissible dark>
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
import { computed, type ComputedRef } from 'vue'
import { useNotificationsStore, type INotification } from '@/store/notifications'

// Store:
const store = useNotificationsStore()

// Getters:
const getNotifications: ComputedRef<Array<INotification>> = computed(() => {
  return store.getNotifications
})
</script>
