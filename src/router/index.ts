import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import SignInView from "../views/SignInView.vue";
import DashboardView from "../views/DashboardView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import MainDashboardView from "../views/MainDashboardView.vue";
import ProfileView from "../views/ProfileView.vue";
import CreateHospitalView from "../views/CreateHospitalView.vue";
import WorkInProgressView from "../views/WorkInProgressView.vue";
import ErrorPageView from "../views/ErrorPageView.vue";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}

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
    // beforeEnter: (to, from, next) => {
    //   onAuthStateChanged(auth, (user) => {
    //     if (!user) {
    //       next();
    //     } else if (user && from.name === "Sign-Up") {
    //       next();
    //     } else {
    //       next({ name: "Main-Dashboard" });
    //     }
    //   });
    // },
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
      requiresAuth: true,
    },
    // beforeEnter: (to, from, next) => {
    //   onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       next();
    //     } else {
    //       next({ name: "Sign-In" });
    //     }
    //   });
    // },
    children: [
      {
        path: "",
        name: "Main-Dashboard",
        component: MainDashboardView,
        meta: {
          title: "Dashboard",
          requiresAuth: true,
        },
        // beforeEnter: (to, from, next) => {
        //   onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //       next();
        //     } else {
        //       next({ name: "Sign-In" });
        //     }
        //   });
        // },
      },
      {
        path: "profile",
        name: "Profile",
        component: ProfileView,
        meta: {
          title: "Profile",
          requiresAuth: true,
        },
        // beforeEnter: (to, from, next) => {
        //   onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //       next();
        //     } else {
        //       next({ name: "Sign-In" });
        //     }
        //   });
        // },
      },
      {
        path: "create-hospital",
        name: "Create-Hospital",
        component: CreateHospitalView,
        meta: {
          title: "Create Hospital",
          requiresAuth: true,
        },
        // beforeEnter: (to, from, next) => {
        //   onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //       next();
        //     } else {
        //       next({ name: "Sign-In" });
        //     }
        //   });
        // },
      },
      {
        path: "calendar",
        name: "Calendar",
        component: WorkInProgressView,
        meta: {
          title: "Calendar",
          requiresAuth: true,
        },
      },
      {
        path: "chat",
        name: "Chat",
        component: WorkInProgressView,
        meta: {
          title: "Chat",
          requiresAuth: true,
        },
      },
      {
        path: "support",
        name: "Support",
        component: WorkInProgressView,
        meta: {
          title: "Support",
          requiresAuth: true,
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

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !(await getCurrentUser())) {
    return "/sign-in";
  }
});

export default router;
