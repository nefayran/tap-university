import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ConfigurationDashboardPage from '@/pages/ConfigurationDashboardPage.vue'
import ExaminesDashboardPage from '@/pages/ExaminesDashboardPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: ConfigurationDashboardPage
    },
    {
      path: '/examines',
      name: 'examines',
      component: ExaminesDashboardPage
    }
  ]
})

export default router
