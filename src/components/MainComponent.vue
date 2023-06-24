<template>
    <main class="main">
        <section class="main-container">
            <div class="hero-section__content">
                <div class="hero-section__text">
                    <h1 class="section-title">Feel Better about<br /><span>Finding Healthcare</span></h1>
                    <p class="section-subtitle">Discover the Path to Exceptional Healthcare with
                        <br /><span>Care-Path</span>: Your Trusted Companion on the Road to Wellness
                    </p>
                </div>
                <div class="section-infos">
                    <div class="section-info">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gold" class="w-5 h-5" width="40px"
                            height="40px">
                            <path
                                d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                        </svg>

                        <p>Profiles for every doctor on campus</p>
                    </div>
                    <div class="section-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="gold" viewBox="0 0 24 24" stroke-width="1.0"
                            stroke="currentColor" class="w-6 h-6" width="40px" height="40px">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>

                        <p>1000+ rating from students and staffs</p>
                    </div>
                </div>
            </div>
            <div class="hero-img__container">
                <!-- <img class="hero-img" src="../assets/images/hero-image2.png" alt="hero image" loading="lazy" /> -->
            </div>
        </section>
        <slot></slot>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'MainComponent',
})
</script>

<style>
.main-container {
    padding-top: calc(var(--navbar-height) + 1rem);
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 4rem;
}

.section-title {
    color: var(--dark-blue);
    font-size: var(--h1-font-size);
    font-weight: var(--font-semi-bold);
}

.section-subtitle {
    color: var(--sm-text-color);
    font-weight: var(--font-normal);
    font-size: var(--small-font-size);
}

.section-subtitle span {
    color: var(--dark-blue);
    font-weight: var(--font-semi-bold);
}

.section-infos {
    font-size: var(--tiny-font-size);
    margin-top: 20px;
    display: flex;
    gap: 1rem;
}

.section-info {
    padding: 0.5rem 0.8rem;
    width: 150px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

.hero-img__container {
    background-image: url('../assets/images/hero-image2.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 450px;
}

@media screen and (max-width: 1024px) {
    .hero-img__container {
        height: 420px;
    }
}

@media screen and (max-width: 768px) {
    .main-container {
        flex-direction: column;
        margin-bottom: 2rem;
        position: relative;
        text-align: center;
    }

    .hero-img__container {
        order: -1;
    }

    .hero-img {
        width: 250px;
    }

    .section-title {
        position: absolute;
        top: 230px;
        font-size: var(--h2-font-size);
    }

    .section-title span {
        position: absolute;
        top: 50px;
        left: 250px;
        width: 250px;
    }

    .section-infos {
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
}

@media screen and (max-width: 700px) {
    .section-title {
        left: 100px;
    }

    .section-title span {
        left: 230px;
    }
}

@media screen and (max-width: 650px) {
    .section-title {
        left: 95px;
    }

    .section-title span {
        left: 160px;
    }
}

@media screen and (max-width: 590px) {
    .section-title span {
        position: static;
    }

    .section-title {
        top: 250px;
        left: 0;
        right: 0;
    }
}

@media screen and (max-width: 325px) {
    .section-infos {
        gap: 0.5rem;
    }

    .hero-img__container {
        width: 250px;
        height: 400px;
    }
}
</style>