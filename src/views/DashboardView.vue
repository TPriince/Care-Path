<template>
    <section id="dashboard">
        <header>
            <div class="header-logo">
                <i class='bx bx-menu'></i>
                <RouterLink class="logo" to="/"><span class="logo-care">Care</span>Path</RouterLink>
            </div>
            <div class="search-and-profile">
                <div class="search">
                    <input type="text" placeholder="Search hospitals">
                    <button class="search-icon__btn"><i class='bx bx-search-alt'></i></button>
                </div>
                <div class="profile">
                    <div>ICON</div>
                    <div>ICON</div>
                    <div class="user-profile">
                        <img :src="userProfilePicture" alt="User profile picture" v-if="userProfilePicture" />
                        <span v-else>{{ userFirstNameInitial }}</span>
                    </div>
                </div>
            </div>
        </header>
        <div class="sidebar">
            <ul class="sidebar-items">
                <li class="general">
                    <span>General</span>
                </li>
                <li :class="activeLink === 'dashboard' ? 'active' : ''" @click="activeLink = 'dashboard'">
                    <span class="sidebar-icon icon-1"><i class='bx bxs-grid-alt'></i></span>
                    <span class="sidebar-item">Dashboard</span>
                </li>
                <li :class="activeLink === 'calendar' ? 'active' : ''" @click="activeLink = 'calendar'">
                    <span class="sidebar-icon"><i class='bx bxs-calendar'></i></span>
                    <span class="sidebar-item">Calendar</span>
                </li>
                <li :class="activeLink === 'appointments' ? 'active' : ''" @click="activeLink = 'appointments'">
                    <span class="sidebar-icon"><i class='bx bxs-plus-square'></i></span>
                    <span class="sidebar-item">Appointments</span>
                </li>
                <li :class="activeLink === 'statistics' ? 'active' : ''" @click="activeLink = 'statistics'">
                    <span class="sidebar-icon"><i class='bx bx-stats'></i></span>
                    <span class="sidebar-item">Statistics</span>
                </li>
                <li class="tools">
                    <span>Tools</span>
                </li>
                <li :class="activeLink === 'chat' ? 'active' : ''" @click="activeLink = 'chat'">
                    <span class="sidebar-icon"><i class='bx bxs-conversation'></i></span>
                    <span class="sidebar-item">Chat</span>
                </li>
                <li :class="activeLink === 'support' ? 'active' : ''" @click="activeLink = 'support'">
                    <span class="sidebar-icon"><i class='bx bx-support'></i></span>
                    <span class="sidebar-item">Support</span>
                </li>
            </ul>
            <ul class="sidebar-bottom-items">
                <li :class="activeLink === 'logout' ? 'active' : ''" @click="activeLink = 'logout'">
                    <span class="sidebar-icon"><i class='bx bx-log-out'></i></span>
                    <span class="sidebar-item" @click="handleSignOut">Log out</span>
                </li>
            </ul>
        </div>
        <RouterView />
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const store = useStore();
        // const router = useRouter();

        const handleSignOut = () => {
            signOut(auth)
                .then(() => {
                    console.log('User signed out');
                    // window.location.reload();
                })
                .catch(err => {
                    console.log(err.message);
                })
        }

        const activeLink = ref('dashboard');
        const userProfilePicture = computed(() => store.state.currentUser.profilePicture);
        const userFirstNameInitial = computed(() => store.state.currentUser.firstNameInitial);

        return {
            activeLink,
            userProfilePicture,
            userFirstNameInitial,
            handleSignOut
        }
    }
})
</script>

<style scoped>
#dashboard {
    display: grid;
    grid-template-areas: "header header header"
        "sidebar main main";
    grid-template-rows: 4rem 1fr;
    grid-template-columns: 250px 0.5fr;
    height: 100vh;
    width: 100%;
    background-color: var(--whitish);
}

/* Header */
#dashboard header {
    grid-area: header;
    padding: 0 40px;
    display: flex;
    align-items: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    /* width: 100%;
    overflow: hidden; */
}

.active {
    color: var(--whitish);
    font-weight: var(--font-semi-bold);
    background-color: var(--sm-text-color);
}

/* Sidebar */
#dashboard .sidebar {
    grid-area: sidebar;
    padding: 30px;
    border-right: 2px solid lightgray;
}

.sidebar-bottom-items {
    margin-top: 40px;
}

.sidebar-items li,
.sidebar-bottom-items li {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.sidebar-items li:hover,
.sidebar-bottom-items li:hover {
    background-color: var(--sm-text-color);
    cursor: pointer;
}

.general,
.tools,
.sidebar-bottom-items li {
    font-size: var(--small-font-size);
}


.sidebar-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--h3-font-size);
}

.icon-1 {
    color: gold;
}


.header-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 250px;
}

.bx-menu {
    font-size: 1.8rem;
    cursor: pointer;
}

.logo {
    color: var(--dark-blue);
    font-size: var(--h3-font-size);
    font-weight: var(--font-semi-bold);
}

.logo-care {
    color: gold;
}


.search-and-profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 250px);
}

.search {
    max-width: 400px;
    width: 100%;
    border-radius: 50px;
    background-color: rgb(218, 214, 214);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px;
}

.search input {
    width: 85%;
    padding: 4px;
    border: 0;
    outline: none;
    background-color: transparent;
    text-indent: 16px;
}

.search input::placeholder {
    font-size: var(--small-font-size);
}

.search-icon__btn {
    padding: 6px;
    outline: none;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 2px;
}

.bx-search-alt {
    font-size: 1.1rem;
    color: var(--dark-blue);
}

.profile {
    border: 1px solid var(--dark-blue);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

.user-profile {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--dark-blue);
    color: var(--whitish);
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-profile img {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
}


</style>