<template>
  <NavBar v-show="showNavBar" />
  <RouterView />
</template>
  
<script lang="ts">
import { defineComponent, ref, watch, provide, computed } from 'vue';
import { useRoute } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { useStore } from 'vuex';
import NavBar from './components/NavBar.vue'
import axios from 'axios';

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const userLocation = computed(() => store.state.userLocation)

    console.log(`${process.env.VUE_APP_RAPID_API_KEY}`)

    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      store.commit('updateUser', user)
      // console.log(user)
      if (user) {
        console.log('Signed in')
        // console.log(user.uid)
        store.dispatch('getCurrentUser');
      } else {
        console.log('Signed out');
      }
    }
    );

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          axios.get("https://feroeg-reverse-geocoding.p.rapidapi.com/address", {
            headers: {
              "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`,
              "X-RapidAPI-Host": "feroeg-reverse-geocoding.p.rapidapi.com",
            },
            params: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
              lang: "en",
              mode: "text",
              format: '\'[SN[, ] - [23456789ab[, ]\''
            }
          })
            .then(response => {
              // console.log(response.data);
              const address = response.data;
              const addressArr = address.split(", ")
              const state = addressArr[1].split(" ")[0];
              const LGA = addressArr[2]
              // console.log(state, LGA);
              store.commit('updateUserLocation', state);
              store.commit('updateUserLGA', LGA);
              store.dispatch('getHospitals', state);
            })
            .catch(err => {
              console.log(err);
            })
        })
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    if (userLocation.value === null) {
      getUserLocation();
    }

    const showNavBar = ref(true);
    const showMobileNav = ref(false);

    const toggleMobileNav = () => {
      showMobileNav.value = !showMobileNav.value;
    }

    provide('showMobileNav', showMobileNav);
    provide('toggleMobileNav', toggleMobileNav);

    const routeNames = ["Sign-Up", "Sign-In", "Forgot-Password", "Dashboard", "Main-Dashboard", "Profile", "Create-Hospital", "Calendar", "Chat", "Support", "Error-page"];

    const onCheckRoute = () => {
      if (routeNames.includes(route.name as string)) {
        showNavBar.value = false;
        showMobileNav.value = false;
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
  --nav-bg-color: #bfe4dc;
  --main-bg-color: #bfe4dc;
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
    padding-right: 0.5rem;
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
</style>
