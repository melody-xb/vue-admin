import { createRouter, createWebHashHistory } from "vue-router";
import login from "../views/Login/indexView.vue";

const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
