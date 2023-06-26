import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import SignInView from "../views/SignInView.vue";
import DashboardView from "../views/DashboardView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import MainDashboardView from "../views/MainDashboardView.vue";
import ProfileView from "../views/ProfileView.vue";
import CreateHospitalView from "../views/CreateHospitalView.vue";
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
    meta: {
      title: "Home",
    },
  },
  {
    path: "/sign-up",
    name: "Sign-Up",
    component: SignUpView,
    meta: {
      title: "Sign Up",
    },
  },
  {
    path: "/sign-in",
    name: "Sign-In",
    component: SignInView,
    meta: {
      title: "Sign In",
    },
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
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: {
      title: "Dashboard",
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
        meta: {
          title: "Dashboard",
        },
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
        meta: {
          title: "Profile",
        },
        beforeEnter: (to, from) => {
          if (!isUserAuthenticated()) {
            return {
              name: "Home",
            };
          }
        },
      },
      {
        path: "create-hospital",
        name: "Create-Hospital",
        component: CreateHospitalView,
        meta: {
          title: "Create Hospital",
        },
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
    meta: {
      title: "Page Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `Care Path | ${to.meta.title}`;
  next();
});

export default router;
