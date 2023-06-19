import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import SignInView from "../views/SignInView.vue";
import DashboardView from "../views/DashboardView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/sign-up",
    name: "Sign-Up",
    component: SignUpView,
  },
  {
    path: "/sign-in",
    name: "Sign-In",
    component: SignInView,
  },
  {
    path: "/forgot-password",
    name: "Forgot-Password",
    component: ForgotPasswordView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: {
      authIsRequired: true,
    },
    // beforeEnter: (to, from) => {
    //     if (!isAuthenticated()) {
    //         return {
    //             name: "Home"
    //         }
    //     }
    // }
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
