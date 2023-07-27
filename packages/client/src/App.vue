<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer class="bg-deep-gray" theme="dark" permanent>
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :title="item.title"
            :prepend-icon="item.icon"
            link
            :to="item.href"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <NotificationContext>
          <v-container fluid>
            <v-row class="fill-height">
              <v-col>
                <router-view v-slot="{ Component }">
                  <transition>
                    <component :is="Component" />
                  </transition>
                </router-view>
              </v-col>
            </v-row>
          </v-container>
        </NotificationContext>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
import NotificationContext from '@/components/notifications/NotificationContext.vue'

const items = [
  { title: 'Home', href: '/', icon: 'mdi-home-outline' },
  { title: 'Examines', href: '/examines', icon: 'mdi-gavel' },
  { title: 'Configuration', href: '/configuration', icon: 'mdi-memory' }
]
</script>
