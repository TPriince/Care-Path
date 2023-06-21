<template>
    <nav class="navbar">
        <RouterLink class="logo" to="/"><span class="logo-care">Care</span>Path</RouterLink>
        <div class="desktop-nav-container">
            <ul class="nav-list">
                <li :class="activeLink === 'home' ? 'active-link nav-link' : 'nav-link'" @click="activeLink = 'home'"><a
                        href="#">Home</a></li>
                <li :class="activeLink === 'doctors' ? 'active-link nav-link' : 'nav-link'" @click="activeLink = 'doctors'">
                    <a href="#">Find Doctors</a>
                </li>
                <li :class="activeLink === 'medications' ? 'active-link nav-link' : 'nav-link'"
                    @click="activeLink = 'medications'">
                    <a href="#">Find Medications</a>
                    <i class='bx bx-chevron-down'></i>
                </li>
                <li :class="activeLink === 'help' ? 'active-link nav-link' : 'nav-link'" @click="activeLink = 'help'"><a
                        href="#">Help</a></li>
            </ul>
            <div class="nav-btns">
                <button class="log-in__btn">
                    <RouterLink to="/sign-in">Log In</RouterLink>
                </button>
                <button class="sign-up__btn">
                    <RouterLink to="/sign-up">Sign Up</RouterLink>
                </button>
            </div>
        </div>
        <i class='bx bx-menu' @click="showMobileNav = !showMobileNav" v-show="!showMobileNav"></i>
        <div class="mobile-nav-container" v-show="showMobileNav">
            <div class="mobile-nav">
                <ul>
                    <li :class="activeLink === 'home' ? 'active-link nav-link' : 'nav-link'" @click="activeLink = 'home'">
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li :class="activeLink === 'doctors' ? 'active-link nav-link' : 'nav-link'"
                        @click="activeLink = 'doctors'">
                        <a href="#">Find Doctors</a>
                    </li>
                    <li :class="activeLink === 'medications' ? 'active-link nav-link' : 'nav-link'"
                        @click="activeLink = 'medications'">
                        <a href="#">Find Medications</a>
                        <i class='bx bx-chevron-down'></i>
                    </li>
                    <li :class="activeLink === 'help' ? 'active-link nav-link' : 'nav-link'" @click="activeLink = 'help'"><a
                            href="#">Help</a></li>
                </ul>
                <div class="nav-btns">
                    <button class="log-in__btn">
                        <RouterLink to="/sign-in">Log In</RouterLink>
                    </button>
                    <button class="sign-up__btn">
                        <RouterLink to="/sign-up">Sign Up</RouterLink>
                    </button>
                </div>
            </div>
            <i class='bx bx-x' @click="showMobileNav = !showMobileNav" v-show="showMobileNav"></i>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
    name: 'NavBar',
    setup() {
        const activeLink = ref("home");

        const showMobileNav = ref(false);

        onMounted(() => {
            const navBar = document.querySelector('.navbar') as HTMLElement;
            window.addEventListener('scroll', () => {
                if (window.scrollY >= 25) {
                    navBar.classList.add('scroll-navbar');
                } else {
                    navBar.classList.remove('scroll-navbar');
                }
            })
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', () => console.log('Scroll event removed from NavBar component (onUnmounted)'));
        })

        return {
            activeLink,
            showMobileNav,
        }
    }
})

</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc(var(--navbar-height) + 1rem);
    padding-left: 1rem;
    padding-right: 1rem;
    z-index: var(--z-fixed);
    background-color: var(--nav-bg-color);
}

.scroll-navbar {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.navbar .logo {
    color: var(--dark-blue);
    font-size: var(--h3-font-size);
    font-weight: var(--font-semi-bold);
}

.navbar .logo-care {
    color: gold;
}

.desktop-nav-container {
    display: flex;
    gap: 3rem;
}

.nav-list {
    display: flex;
    column-gap: 1rem;
}

.nav-link {
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 0.2rem;
}

.nav-link:hover {
    color: var(--dark-blue);
}

.active-link {
    color: var(--dark-blue);
}

.active-link::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 0;
    width: 28px;
    height: 2px;
    border-radius: 3px;
    background-color: var(--dark-blue);
    animation: active-link-slide;
    animation-duration: 0.5s;
    animation-timing-function: linear;
}

@keyframes active-link-slide {
    0% {
        width: 0px;
    }

    100% {
        width: 28px;
    }
}

.nav-btns {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
}

.log-in__btn,
.sign-up__btn {
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: var(--small-font-size);
    font-weight: var(--font-normal);
    transition: all 0.25s;
}

.log-in__btn {
    background-color: transparent;
}

.log-in__btn:hover {
    color: var(--dark-blue);
    font-weight: var(--font-medium);
}

.sign-up__btn {
    background-color: var(--dark-blue);
    color: white;
}

.sign-up__btn:hover {
    background-color: var(--dark-blue-hover);
    font-weight: var(--font-medium);
}

.bx-menu {
    position: absolute;
    top: 18px;
    right: 30px;
    font-size: 1.8rem;
    display: none;
}

.mobile-nav-container {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    min-height: 100%;
    z-index: 1000;
}

.bx-x {
    position: absolute;
    top: 18px;
    right: 30px;
    font-size: 1.8rem;
}

.mobile-nav {
    background-color: lightgray;
    max-width: 250px;
    width: 70%;
    padding: 20px;
    opacity: 1;
    animation: mobile-links-slide 0.2s ease-in;
    height: 100vh;
}

.mobile-nav .nav-link {
    padding: 0px 5px;
    margin: 20px;
}

.mobile-nav li:first-child {
    animation: mobile-links-slide-in 0.3s ease-in;
}

.mobile-nav li:nth-child(2) {
    animation: mobile-links-slide-in 0.5s ease-in;
}

.mobile-nav li:nth-child(3) {
    animation: mobile-links-slide-in 0.7s ease-in;
}

.mobile-nav li:nth-child(4) {
    animation: mobile-links-slide-in 0.9s ease-in;
}

.mobile-nav .nav-link::after {
    left: 5px;
}

.mobile-nav .nav-btns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.mobile-nav .nav-btns .log-in__btn {
    margin-bottom: 15px;
}

@keyframes mobile-links-slide-in {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }

    50% {
        opacicty: 0.5;
    }

    100% {
        opacity: 1;
        transform: translateX(0%);
    }
}

@media screen and (max-width: 1000px) {
    .desktop-nav-container {
        gap: 2rem;
    }

    .nav-btns {
        column-gap: 0.5rem;
    }

    .log-in__btn,
    .sign-up__btn {
        padding: 0.5rem 0.8rem;
    }
}

@media screen and (max-width: 900px) {
    .navbar {
        padding-left: 2rem;
        padding-right: 2rem;
    }
}

@media screen and (max-width: 850px) {
    .desktop-nav-container {
        gap: 1rem;
    }

    .navbar {
        padding-left: 1.85rem;
        padding-right: 1.85rem;
    }

    .nav-list {
        column-gap: 0.5rem;
    }

    .nav-btns {
        column-gap: 0.2rem;
    }
}

@media screen and (max-width: 768px) {
    .navbar {
        padding-left: 1.56rem;
        padding-right: 1.56rem;
    }

    .bx-menu {
        display: block;
    }

    .desktop-nav-container {
        display: none;
    }
}

@media screen and (max-width: 425px) {
    .navbar {
        padding-left: 1rem;
    }

    .bx-menu {
        right: 16px;
    }
}</style>
