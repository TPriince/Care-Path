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
                    <div class="user-initials">{{ userInitials }}</div>
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
        <main>
            <div class="overview">
                <div class="title">
                    <h1 class="section__title">Overview</h1>
                    <select name="date" id="date" class="dropdown">
                        <option value="today">Today</option>
                        <option value="lastweek">Last week</option>
                        <option value="lastmonth">Last Month</option>
                        <option value="lastyear">Last Year</option>
                        <option value="alltime">All Time</option>
                    </select>
                </div>
                <div class="cards">
                    <div class="card card-1">
                        <div class="card-data">
                            <div class="card-content">
                                <h5 class="card-title">Total Doctors</h5>
                                <h1>28</h1>
                            </div>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div class="card-stats">
                            <span><i class='bx bxs-bar-chart-alt-2'></i>65%</span>
                            <span><i class='bx bx-caret-up'></i>10</span>
                            <span><i class='bx bx-caret-down'></i>2</span>
                        </div>
                    </div>
                    <div class="card card-2">
                        <div class="card-data">
                            <div class="card-content">
                                <h5 class="card-title">Total Patients</h5>
                                <h1>64</h1>
                            </div>
                            <i class='bx bx-user'></i>
                        </div>
                        <div class="card-stats">
                            <span><i class='bx bxs-bar-chart-alt-2'></i>65%</span>
                            <span><i class='bx bx-caret-up'></i>10</span>
                            <span><i class='bx bx-caret-down'></i>2</span>
                        </div>
                    </div>
                    <div class="card card-3">
                        <div class="card-data">
                            <div class="card-content">
                                <h5 class="card-title">Shedule</h5>
                                <h1>101</h1>
                            </div>
                            <i class='bx bx-calendar'></i>
                        </div>
                        <div class="card-stats">
                            <span><i class='bx bxs-bar-chart-alt-2'></i>27%</span>
                            <span><i class='bx bx-caret-up'></i>31</span>
                            <span><i class='bx bx-caret-down'></i>16</span>
                        </div>
                    </div>
                    <div class="card card-4">
                        <div class="card-data">
                            <div class="card-content">
                                <h5 class="card-title">Beds Available</h5>
                                <h1>183</h1>
                            </div>
                            <i class='bx bxs-hotel'></i>
                        </div>
                        <div class="card-stats">
                            <span><i class='bx bxs-bar-chart-alt-2'></i>9%</span>
                            <span><i class='bx bx-caret-up'></i>10</span>
                            <span><i class='bx bx-caret-down'></i>7</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hospitals">
                <div class="title">
                    <h1 class="section__title">Hospitals</h1>
                    <div class="add-hospital-section">
                        <select name="date" id="date" class="dropdown">
                            <option value="">Filter</option>
                            <option value="today">Today</option>
                            <option value="lastweek">Last week</option>
                            <option value="lastmonth">Last Month</option>
                            <option value="lastyear">Last Year</option>
                            <option value="alltime">All Time</option>
                        </select>
                        <button class="add-btn">Add Hospital</button>
                    </div>
                </div>
            </div>
        </main>
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
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err.message);
                })
        }

        const activeLink = ref('dashboard');

        const userInitials = computed(() => store.state.currentUser.userInitials);

        return {
            activeLink,
            userInitials,
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

.user-initials {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--dark-blue);
    color: var(--whitish);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Main content */
#dashboard main {
    grid-area: main;
    padding: 0 40px;
    overflow: scroll;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 10px;
}

.section__title {
    color: initial;
    font-size: var(--h2-font-size);
}

.dropdown {
    outline: none;
    border: 0;
    background-color: #f1f4f8;
    border-radius: 5px;
    width: 150px;
    padding: 5px;
    cursor: pointer;
}

.dropdown:hover {
    background-color: #e2e8f0;
}

.cards {
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px; */
    display: flex;
    gap: 20px;
}

.card {
    min-width: 230px;
    height: auto;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.card:hover {
    transform: scale(1.02);
}

.card-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.bxs-user,
.bx-user,
.bx-calendar,
.bxs-hotel {
    font-size: 3rem;
}

.bxs-bar-chart-alt-2 {
    color: purple;
}

.bx-caret-up {
    color: green;
}

.bx-caret-down {
    color: red;
}

.card-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
}

.card-stats span {
    display: flex;
    align-items: center;
}

.card h1 {
    font-size: var(--h2-font-size);
    margin-top: 10px;
}

.card-1 .card-title {
    color: rgb(95, 124, 241);
}

.card-1 {
    background: var(--tealish);
}

.card-1:hover {
    background: var(--tealish-hover);
}

.card-2 {
    background: var(--yellowish);
}

.card-2:hover {
    background: var(--yellowish-hover);
}

.card-2 .card-title {
    color: rgb(72, 61, 25);
}

.card-3 {
    background: var(--greenish);
}

.card-3:hover {
    background: var(--greenish-hover);
}

.card-3 .card-title {
    color: rgb(9, 76, 68);
}

.card-4 {
    background: var(--pinkish);
}

.card-4:hover {
    background: var(--pinkish-hover);
}

.card-4 .card-title {
    color: rgb(128, 72, 72);
}

.add-hospital-section {
    display: flex;
    align-items: center;
    gap: 30px;
}

.add-btn {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    outline: none;
    border-radius: 5px;
    background-color: var(--sm-text-color);
    color: var(--whitish);
    transition: all 0.3s ease;
}

.add-btn:hover {
    background-color: var(--dark-blue-hover);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>