<template>
    <section class="search-section container">
        <div class="search-bars">
            <div class="search-bar__1">
                <input type="text" placeholder="Search Doctors, Conditions, Procedures">
                <i class='bx bx-search-alt'></i>
            </div>
            <div class="search-bar__2">
                <input type="text" placeholder="Set your location">
                <i class='bx bx-location-plus'></i>
                <button @click="getUserLocation" class="search-btn"><i class='bx bx-search'></i></button>
            </div>
        </div>
        <p>What you may be looking for</p>
        <ul class="search-options">
            <li><button>Family medicine<i class='bx bx-x'></i></button></li>
            <li><button>Insomnia <i class='bx bx-x'></i></button></li>
            <li><button>Stomach <i class='bx bx-x'></i></button></li>
            <li><button>Dermatology <i class='bx bx-x'></i></button></li>
            <li><button>COVID-19 <i class='bx bx-x'></i></button></li>
            <li><button>STDs <i class='bx bx-x'></i></button></li>
            <li><button class="search-options__more-btn">more</button></li>
        </ul>
    </section>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'SearchComponent',
    setup() {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position.coords.latitude, position.coords.longitude);
                })
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }

        return {
            getUserLocation
        }
    }
})
</script>

<style scoped>
.search-section {
    position: relative;
    top: -45px;
    padding: 1rem 2rem;
    background-color: #fff;
    border-radius: 6px;
    margin-bottom: 20px
}

.search-section p {
    margin-top: 15px;
    font-weight: var(--font-semi-bold);
}

.search-bars {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.search-bar__1,
.search-bar__2 {
    width: 50%;
    display: flex;
    align-items: center;
    column-gap: 0.8rem;
    position: relative;
}

.search-bars input {
    padding: 0.5rem 2rem;
    border: 1px solid var(--nav-bg-color);
    border-radius: 5px;
    outline: none;
    width: 100%;
    font-size: var(--normal-font-size);
}

.bx-location-plus,
.bx-search-alt {
    position: absolute;
    left: 10px;
    top: 15px;
    color: var(--sm-text-color);
}

.search-bars input::placeholder {
    color: grey;
    font-size: var(--tiny-font-size);
    font-weight: var(--font-medium);
}

.search-btn {
    background-color: var(--dark-blue);
    color: white;
    font-weight: var(--font-normal);
    padding: 0.3rem 1rem;
    font-size: 1.4rem;
    border-radius: 5px;
}

.search-options {
    font-size: var(--tiny-font-size);
    display: flex;
    align-items: center;
    column-gap: 1rem;
    margin-top: 10px;
    flex-wrap: wrap;
}

.search-options button {
    color: var(--sm-text-color);
    font-weight: var(--font-medium);
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    padding: 0.2rem;
    transition: all 0.3s;
}

.search-options button:hover {
    color: var(--dark-blue);
    background-color: var(--nav-bg-color);
}

.bx-x {
    font-size: var(--normal-font-size);
    font-weight: 900;
}

.search-options__more-btn {
    background-color: var(--nav-bg-color);
    border-radius: 3px;
    padding: 0.2rem 0.6rem;
}

.search-options__more-btn:hover {
    background-color: #c5d8d4;
}

@media screen and (max-width: 768px) {
    .search-section {
        position: static;
        top: 0;
    }

    .search-bars {
        flex-direction: column;
        justify-content: center;
    }

    .search-bar__1,
    .search-bar__2 {
        width: 80%;
    }
}

@media screen and (max-width: 590px) {

    .search-bar__1,
    .search-bar__2 {
        width: 100%;
    }

    .search-bars input {
        padding: 0.3rem 1.2rem;
        font-size: var(--small-font-size);
    }

    .bx-location-plus,
    .bx-search-alt {
        left: 4px;
        top: 13px;
    }

    .bx-search {
        font-size: var(--normal-font-size);
    }
}

@media screen and (max-width: 300px) {
    .search-section {
        margin-left: 5px;
        margin-right: 5px;
    }
}</style>