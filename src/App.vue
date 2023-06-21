<template>
  <NavBar v-show="showNavBar" />
  <RouterView />
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from './firebase/config';
import { useStore } from 'vuex';
import NavBar from './components/NavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  },
  setup() {

    const route = useRoute();
    const store = useStore();

    onAuthStateChanged(auth, (user) => {
      store.commit('updateUser', user)
      console.log(user)
      if (user) {
        console.log(user.uid)
        store.dispatch('getCurrentUser')
      } else {
        console.log('User is signed out');
      }
    }
    );

    const showNavBar = ref(true);

    const onCheckRoute = () => {
      if (route.name == 'Sign-Up' || route.name == 'Sign-In' || route.name === 'Forgot-Password' || route.name == 'Dashboard' || route.name === 'Main-Dashboard') {
        showNavBar.value = false;
      } else {
        showNavBar.value = true;
      }
    }

    watch(() => route.name, () => {
      onCheckRoute();
    })

    return {
      showNavBar,
    }

  },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap');

:root {
  font-family: 'Poppins', sans-serif;
  /* color-scheme: dark light; */

  --navbar-height: 3rem;
  /* ====== Font and typography ===== */

  /* 1rem = 16px */
  --big-font-size: 3.5rem;
  --h1-font-size: 2.25rem;
  --h2-font-size: 1.5rem;
  --h3-font-size: 1.25rem;
  --normal-font-size: 1rem;
  --small-font-size: 0.875rem;
  --smaller-font-size: 0.813rem;
  --tiny-font-size: 0.625rem;

  /* ===== Font weight ===== */
  --font-normal: 400;
  --font-medium: 500;
  --font-semi-bold: 600;

  /* ===== Font color ===== */
  --dark-blue: #0000b8;
  --dark-blue-hover: #0000e6;
  --sm-text-color: #6565f6;
  --nav-bg-color: #CBE2DD;
  --main-bg-color: #CBE2DD;
  --whitish: #ffffff;
  --tealish: linear-gradient(145deg, rgb(0, 180, 216, 0.2), rgb(0, 150, 199, 0.2));
  --tealish-hover: linear-gradient(145deg, rgb(0, 180, 216, 0.3), rgb(0, 150, 199, 0.3));
  --yellowish: linear-gradient(to right, rgb(246, 211, 101, 0.9), rgb(240, 188, 173, 0.9));
  --yellowish-hover: linear-gradient(to right, rgb(246, 211, 101), rgb(240, 188, 173));
  --greenish: linear-gradient(to right, rgb(0, 176, 155, 0.6), rgb(149, 200, 60, 0.7));
  --greenish-hover: linear-gradient(to right, rgb(0, 176, 155, 0.7), rgb(149, 200, 60, 0.8));
  --pinkish: linear-gradient(to right, rgb(255, 0, 170, 0.3), rgb(255, 0, 170, 0.3));
  --pinkish-hover: linear-gradient(to right, rgb(255, 0, 170, 0.4), rgb(255, 0, 170, 0.4));

  /* z-index */
  --z-tooltip: 10;
  --z-fixed: 100;
  --z-modal: 1000;
}


*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* border: 1px solid black; */
}

html {
  scroll-behavior: smooth;
}

body,
button,
input,
textarea {
  font-size: var(--normal-font-size);
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  background-color: var(--main-bg-color);
  width: 100%;
  height: 100%;
  font-size: var(--normal-font-size);
}

a {
  color: inherit;
  text-decoration: none;
}

li {
  list-style: none;
}

img,
picture,
video,
canvas,
svg {
  display: block;
}

input,
button,
textarea,
select,
address {
  font: inherit;
}

button {
  cursor: pointer;
  border: 0;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

.main {
  max-width: 1024px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width: 1024px) {
  .main {
    max-width: 768px;
  }
}

@media screen and (max-width: 768px) {
  .main {
    padding: 1.4rem;
  }
}

@media screen and (max-width: 425px) {
  .main {
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
}

@media screen and (max-width: 300px) {
  .main {
    padding-left: 0.5rem;
    padding-right:0.5rem;
  }
}


/* Sign up and sign in forms styles */
.form-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.left-container {
  background: var(--main-bg-color);
  background: linear-gradient(-45deg, rgba(36, 95, 249, 1) 67%, rgba(97, 141, 249, 1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 40px;
  position: relative;
}

.left-container::after {
  content: '';
  position: absolute;
  top: 0;
  right: -100px;
  width: 100%;
  height: 50%;
  background: var(--main-bg-color);
  background: linear-gradient(-45deg, rgba(36, 95, 249, 1) 67%, rgba(97, 141, 249, 1) 100%);
  z-index: -1;
}

.img-container img {
  width: 100%;
  height: auto;
  width: 300px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
}

.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--whitish);
  position: relative;
  border-top-left-radius: 40px;
}

.form-wrapper::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: -100px;
  width: 100%;
  height: 50%;
  background-color: var(--whitish);
  z-index: -1;
}

@media screen and (max-width: 800px) {
  .img-container img {
    width: 250px;
  }
}

@media screen and (max-width: 768px) {
  .form-section {
    grid-template-columns: 1fr;
  }

  .left-container {
    display: none;
  }

  .form-wrapper {
    border-radius: 0;
  }

  .form-wrapper::before {
    display: none;
  }
}


/* @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
    a:hover {
      color: #747bff;
    }
    button {
      background-color: #f9f9f9;
    }
  } */</style>
