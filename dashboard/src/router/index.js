import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LiveView from "../views/LiveView.vue";
import ArchivesView from "../views/ArchivesView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/live",
    name: "live",
    component: LiveView,
  },
  {
    path: "/archives",
    name: "archives",
    component: ArchivesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
