import { createRouter, createWebHistory } from 'vue-router'
import OperacionView from '../views/OperacionView.vue'
import HistorialView from '../views/HistorialView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'operacion',
      component: OperacionView
    },
    {
      path: '/historial',
      name: 'historial',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HistorialView
    }
  ]
})

export default router
