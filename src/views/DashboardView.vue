<template>
    <section id="dashboard" :class="toggleSideBar ? 'toggle-sidebar' : ''">
        <header>
            <div class="header-logo">
                <i class='bx bx-menu' @click="toggleSideBar = !toggleSideBar"></i>
                <RouterLink class="logo" to="/"><span class="logo-care">Care</span>Path</RouterLink>
            </div>
            <div class="search-and-profile">
                <div class="search">
                    <input type="text" placeholder="Search hospitals">
                    <button class="search-icon__btn"><i class='bx bx-search-alt'></i></button>
                </div>
                <div class="profile">
                    <div class="user-profile">
                        <img :src="userProfilePicture" alt="User profile picture" v-if="userProfilePicture" />
                        <span v-else>{{ userFirstNameInitial }}</span>
                    </div>
                </div>
            </div>
        </header>
        <div class="sidebar">
            <ul class="sidebar-items">
                <li :class="{ active: activeLink === 'dashboard' }" @click="activeLink = 'dashboard'">
                    <span class="sidebar-icon"><i class='bx bxs-grid-alt'></i></span>
                    <span class="sidebar-item" v-show="!toggleSideBar">Dashboard</span>
                </li>
                <li :class="{ active: activeLink === 'calendar' }" @click="activeLink = 'calendar'">
                    <span class="sidebar-icon"><i class='bx bxs-calendar'></i></span>
                    <span class="sidebar-item" v-show="!toggleSideBar">Calendar</span>
                </li>
                <li :class="{ active: activeLink === 'appointments' }" @click="activeLink = 'appointments'">
                    <span class="sidebar-icon"><i class='bx bxs-plus-square'></i></span>
                    <span class="sidebar-item" v-show="!toggleSideBar">Appointments</span>
                </li>
                <li :class="{ active: activeLink === 'statistics' }" @click="activeLink = 'statistics'">
                    <span class="sidebar-icon"><i class='bx bx-stats'></i></span>
                    <span class="sidebar-item" v-show="!toggleSideBar">Statistics</span>
                </li>
                <li class="tools">
                    <span>Tools</span>
                </li>
                <li :class="{ active: activeLink === 'chat' }" @click="activeLink = 'chat'">
                    <span class="sidebar-icon"><i class='bx bxs-conversation'></i></span>
                    <span class="sidebar-item" v-show="!toggleSideBar">Chat</span>
                </li>
                <li :class="{ active: activeLink === 'support' }" @click="activeLink = 'support'">
                    <span class="sidebar-icon"><i class='bx bx-support'></i></span>
                    <span class="sidebar-item" v-show="!toggleSideBar">Support</span>
                </li>
            </ul>
            <ul class="sidebar-bottom-items">
                <li :class="{ active: activeLink === 'logout' }" @click="handleSignOut">
                    <span class="sidebar-icon"><i class='bx bx-log-out'></i></span>
                    <span class="sidebar-item" v-show="!toggleSideBar">Log out</span>
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
        const toggleSideBar = ref(false);
        const activeLink = ref('dashboard');

        const handleSignOut = () => {
            activeLink.value = 'logout';
            signOut(auth)
                .then(() => {
                    console.log('User signed out');
                    // window.location.reload();
                })
                .catch(err => {
                    console.log(err.message);
                })
        }

        const userProfilePicture = computed(() => store.state.currentUser.profilePicture);
        const userFirstNameInitial = computed(() => store.state.currentUser.firstNameInitial);

        return {
            toggleSideBar,
            activeLink,
            handleSignOut,
            userProfilePicture,
            userFirstNameInitial,
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
    grid-template-columns: 250px 1fr;
    width: 100%;
    height: 100vh;
    background-color: var(--whitish);
    transition: all 0.2s ease;
}

#dashboard.toggle-sidebar {
    grid-template-columns: 103px 1fr;
}

/* Header */
#dashboard header {
    grid-area: header;
    padding: 0 40px;
    display: flex;
    align-items: center;
    gap: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    width: 100%;
}

.active {
    color: var(--whitish);
    font-weight: var(--font-semi-bold);
    background-color: var(--sm-text-color);
}

.active .bxs-grid-alt,
.active .bxs-calendar,
.active .bx-stats,
.active .bxs-conversation,
.active .bx-support,
.active .bx-log-out {
    color: gold;
}

/* Sidebar */
#dashboard .sidebar {
    grid-area: sidebar;
    padding: 30px;
    border-right: 2px solid lightgray;
    overflow: hidden;
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

.header-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 250px;
    width: 100%;
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
    gap: 10px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    overflow: hidden;
}

.user-profile img {
    max-width: 100%;
    height: auto;
}

@media screen and (max-width: 768px) {
    #dashboard header {
        padding: 0 20px;
    }

    #dashboard .sidebar {
        padding: 20px;
    }

    #dashboard.toggle-sidebar {
        grid-template-columns: 85px 1fr;
    }
}

@media screen and (max-width: 590px) {
    #dashboard {
        grid-template-columns: 0px 1fr;
    }

    #dashboard .sidebar {
        transform: translateX(-100%);
    }

    #dashboard.toggle-sidebar .sidebar {
        transform: translateX(0);
    }

    .search-and-profile {
        gap: 5px;
    }
}

@media screen and (max-width: 450px) {
    #dashboard header {
        padding: 0 1rem;
    }

    #dashboard .sidebar {
        padding: 1rem;
    }

    #dashboard.toggle-sidebar {
        grid-template-columns: 75px 1fr;
    }

    .header-logo {
        width: initial;
    }

    .search-and-profile {
        width: initial;
        justify-content: flex-end;
    }

    .search {
        width: 60%;
    }
}

@media screen and (max-width: 400px) {

}
</style>