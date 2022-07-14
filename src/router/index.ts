import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/LogIn.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/UserRegistration.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("../views/auth/PasswordResetRequest.vue"),
    },
    {
      path: "/password-reset",
      name: "password-reset",
      component: () => import("../views/auth/PasswordReset.vue"),
    },
  ],
});

export default router;
