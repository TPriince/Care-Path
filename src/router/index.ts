import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import SignInView from "../views/SignInView.vue";
import DashboardView from "../views/DashboardView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import MainDashboardView from "../views/MainDashboardView.vue";
import ProfileView from "../views/ProfileView.vue";
import ErrorPageView from "../views/ErrorPageView.vue";
import store from "@/store";
import { auth } from "@/firebase/config";

const isUserAuthenticated = () => {
  console.log(!!auth.currentUser);
  console.log(!!store.state.user);
  return !!auth.currentUser;
};
console.log(isUserAuthenticated());

// const authGuard = (to, from, next) => {
//   if (to.meta.authIsRequired && !isUserAuthenticated()) {
//     next({ name: "Home" });
//   } else {
//     next();
//   }
// };

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
    beforeEnter: (to, from) => {
      if (isUserAuthenticated() && from.name !== "Sign-Up") {
        return {
          name: "Main-Dashboard",
        };
      }
    },
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
    beforeEnter: (to, from) => {
      if (!isUserAuthenticated()) {
        return {
          name: "Home",
        };
      }
    },
    children: [
      {
        path: "",
        name: "Main-Dashboard",
        component: MainDashboardView,
        beforeEnter: (to, from) => {
          if (!isUserAuthenticated()) {
            return {
              name: "Home",
            };
          }
        },
      },
      {
        path: "profile",
        name: "Profile",
        component: ProfileView,
        beforeEnter: (to, from) => {
          if (!isUserAuthenticated()) {
            return {
              name: "Home",
            };
          }
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "Error-page",
    component: ErrorPageView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
