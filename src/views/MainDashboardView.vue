<template>
    <div>
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
                            <h5 class="card-title">LGA Hospitals</h5>
                            <h1>{{ lgaHospitals.length }}</h1>
                        </div>
                        <i class='bx bxs-location-plus'></i>
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
                            <h5 class="card-title">State Hospitals</h5>
                            <h1>{{ hospitals.length }}</h1>
                        </div>
                        <i class='bx bx-location-plus'></i>
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
                            <h5 class="card-title">Private Ownership</h5>
                            <h1>{{ privateHospitals.length }}</h1>
                        </div>
                        <i class='bx bxs-shield-plus'></i>
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
                            <h5 class="card-title">Public Ownership</h5>
                            <h1>{{ publicHospitals.length }}</h1>
                        </div>
                        <i class='bx bx-shield-plus'></i>
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
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'MainDashboardView',
    setup() {
        const store = useStore();

        const hospitals = computed(() => store.state.hospitals);
        const lgaHospitals = computed(() => store.state.lgaHospitals);
        const privateHospitals = computed(() => {
            return lgaHospitals.value.filter((h: any) => h.hospital.ownership === 'Private');
        });
        const publicHospitals = computed(() => {
            return lgaHospitals.value.filter((h: any) => h.hospital.ownership === 'Public');
        });

        return {
            lgaHospitals,
            hospitals,
            privateHospitals,
            publicHospitals,
        }
    },
})
</script>

<style scoped>
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
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

.card-data .bxs-location-plus,
.bx-location-plus,
.bxs-shield-plus,
.bx-shield-plus {
    font-size: 2.9rem;
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

@media screen and (max-width: 768px) {
    .cards {
        overflow-x: scroll;
    }

    .card {
        margin-bottom: 20px;
    }

    .section__title {
        align-self: start;
    }

    .add-hospital-section {
        flex-direction: column;
        gap: 10px;
    }
}

@media screen and (max-width: 450px) {
    .card {
        min-width: 210px;
        padding: 1.1rem;
    }
}

@media screen and (max-width: 300px) {
    .add-hospital-section {
        align-items: flex-start;
    }
}
</style>