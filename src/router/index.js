import Vue from 'vue'
import VueRouter from 'vue-router'
import population from '@/components/population.vue'
import history from '@/components/history.vue'
import historyForDay from '@/components/historyForDay.vue'
import newScene from '@/components/newScene.vue'
import upLoad from '@/components/upload.vue'
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: population
  },
  {
    path: "/history",
    component: history
  },
  {
    path: '/historyForDay',
    component: historyForDay
  },
  {
    path: '/newScene',
    component: newScene
  },
  {
    path: '/uplaod',
    component: upLoad
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})
export default router;