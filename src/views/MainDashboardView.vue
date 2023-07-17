<template>
    <div>
        <div class="overview">
            <div class="title">
                <h1 class="section__title">Overview</h1>
            </div>
            <div class="cards">
                <div class="card card-1">
                    <div class="card-data">
                        <div class="card-content">
                            <h5 class="card-title">State Hospitals</h5>
                            <h1>{{ hospitals.length }}</h1>
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
                            <h5 class="card-title">LGA Hospitals</h5>
                            <h1>{{ lgaHospitals.length }}</h1>
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
                <div class="filter-hospital-section">
                    <div>
                        <!-- <p>Filter by State</p> -->
                        <select name="state" id="state" class="dropdown" :value="selectedState" @change="changeState">
                            <option value="" hidden>Change State</option>
                            <option v-for="(state, index) in allStatesArr" :key="index" :value="state">{{ state }}</option>
                        </select>
                    </div>
                    <div class="filter-by-lga">
                        <!-- <p>Filter by LGA</p> -->
                        <select name="lga" id="lga" class="dropdown" v-model="localGovernmentArea">
                            <option value="" hidden>Filter vy LGA</option>
                            <option v-for="(lga, index) in lgasArr" :key="index" :value="lga">{{ lga }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="table-wrapper" v-show="lgaHospitals.length > 0">
                <table>
                    <thead>
                        <tr>
                            <th>State</th>
                            <th>LGA</th>
                            <th>Name</th>
                            <th>Ward</th>
                            <th>Level</th>
                            <th>Facility Code</th>
                            <th>Ownership</th>
                            <th>Facility UID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="hospital in pagination" :key="hospital.id">
                            <td>{{ hospital.hospital.state }}</td>
                            <td>{{ hospital.hospital.LGA }}</td>
                            <td>{{ hospital.hospital.facilityName }}</td>
                            <td>{{ hospital.hospital.ward }}</td>
                            <td>{{ hospital.hospital.facilityLevel }}</td>
                            <td>{{ hospital.hospital.facilityCode }}</td>
                            <td>{{ hospital.hospital.ownership }}</td>
                            <td>{{ hospital.hospital.facilityUID }}</td>
                            <td>
                                <button class="share-btn"><i class='bx bxs-share-alt'></i></button>
                                <!-- <button class="delete-btn"><i class='bx bx-trash'></i></button> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="page-btns-wrapper" v-show="lgaHospitals.length > 0">
                <button class="page-btn" v-for="(page, index) in buttonPages" :key="index" @click="handleSetPage(page)"
                    :class="{ 'current-page-btn': currentPage === page }">
                    {{ page }}
                </button>
            </div>
            <div class="no-data" v-show="hospitals.length > 0 && lgaHospitals.length === 0">
                <div>
                    <h2>No hospitals found in this Local Goverment Area. Try filtering by LGA.</h2>
                </div>
            </div>
            <div class="no-data" v-if="hospitals.length === 0">
                <div>
                    <h2>Sorry, no hospitals found in this region.</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { allStates } from '@/utils/getAllStates';

export default defineComponent({
    name: 'MainDashboardView',
    setup() {
        const store = useStore();

        const hospitals = computed(() => store.state.hospitals);
        const localGovernmentArea = ref(store.state.userLGA);
        // console.log(localGovernmentArea.value)
        const lgaHospitals = computed(() => hospitals.value.filter((h: any) => h.hospital.LGA === localGovernmentArea.value));

        const privateHospitals = computed(() => {
            return hospitals.value.filter((h: any) => h.hospital.ownership === 'Private');
        });
        const publicHospitals = computed(() => {
            return hospitals.value.filter((h: any) => h.hospital.ownership === 'Public');
        });

        const lgas = computed(() => hospitals.value.map((h: any) => h.hospital.LGA));
        const lgasArr = ref(Array.from(new Set(lgas.value)));
        lgasArr.value.sort();
        const PER_PAGE = 10;
        const page = ref(1);
        const pages = ref(1);
        const currentPage = ref(1);
        pages.value = Math.ceil(lgaHospitals.value.length / PER_PAGE);
        const from = ref(page.value * PER_PAGE - PER_PAGE);

        watch(hospitals, () => {
            localGovernmentArea.value = store.state.userLGA;
        })

        watch(lgaHospitals, () => {
            currentPage.value = 1;
            page.value = 1;
            from.value = page.value * PER_PAGE - PER_PAGE;
            pages.value = Math.ceil(lgaHospitals.value.length / PER_PAGE);
            lgasArr.value = Array.from(new Set(lgas.value));
        })

        const pagination = computed(() => {
            let to = from.value + PER_PAGE;
            return lgaHospitals.value.slice(from.value, to);
        })

        const buttonPages = computed(() => {
            return Array.from({ length: pages.value }, (_, i) => i + 1);
        })

        const handleSetPage = (pageNumber: number) => {
            currentPage.value = pageNumber;
            page.value = pageNumber;
            from.value = page.value * PER_PAGE - PER_PAGE;
        }

        const allStatesArr = ref(allStates);
        const selectedState = ref('');

        const changeState = (e: Event) => {
            selectedState.value = (e.target as HTMLInputElement).value;
            localStorage.removeItem('LGA');
            store.dispatch('getHospitals', selectedState.value);
            store.commit('setUpdatingUserStatus', true);
        }

        return {
            hospitals,
            lgaHospitals,
            privateHospitals,
            publicHospitals,
            lgasArr,
            localGovernmentArea,
            pagination,
            buttonPages,
            handleSetPage,
            currentPage,
            allStatesArr,
            selectedState,
            changeState
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

.hospitals {
    margin-bottom: 20px;
}

.filter-hospital-section {
    display: flex;
    /*align-items: center;*/
    gap: 10px;
}

/*.filter-hospital-section p {
    text-align: center;
    font-weight: var(--font-semi-bold);
}*/

.no-data {
    margin-top: 20px;
}

.no-data h2 {
    color: var(--dark-blue);
    text-align: center;
}

.table-wrapper {
    margin-top: 20px;
    height: 400px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    /* position */
}

table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    padding-left: 2px;
    padding-right: 2px;
}

tr {
    border-bottom: 1px solid var(--sm-text-color);
}

th,
td {
    padding: 5px;
    padding-block: 10px;
}

tr td:last-child {
    text-align: center;
}

thead {
    position: sticky;
    top: 0;
}

thead tr {
    background-color: var(--dark-blue);
    color: var(--whitish);
}

tbody tr {
    font-size: var(--small-font-size);
}

tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
}

.bxs-share-alt {
    font-size: 1.2rem;
}

.page-btns-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-left: 8px;
    padding-right: 8px;
}

.page-btn {
    background-color: var(--sm-text-color);
    color: var(--whitish);
    padding: 5px 15px;
    border-radius: 5px;
    transition: all ease 0.3s;
}

.current-page-btn {
    background-color: var(--dark-blue-hover);
    transition: all ease 0.3s;
}

@media screen and (max-width: 1350px) {
    .cards {
        overflow-x: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .cards::-webkit-scrollbar {
        display: none;
    }
}

@media screen and (max-width: 1024px) {
    table {
        min-width: 600px;
    }
}

@media screen and (max-width: 768px) {

    .card {
        margin-bottom: 20px;
    }

    .section__title {
        align-self: start;
    }

    .filter-hospital-section {
        flex-direction: column;
    }
}

@media screen and (max-width: 450px) {
    .card {
        min-width: 210px;
        padding: 1.1rem;
    }
}

@media screen and (max-width: 300px) {
    .filter-hospital-section {
        align-items: flex-start;
    }
}
</style>