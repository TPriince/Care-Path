<template>
    <div class="mainbox">
        <div>
            <span class="err">4</span>
            <i class="far fa-question-circle fa-spin"></i>
            <span class="err2">4</span>
        </div>
        <div class="msg">Sorry, but we're having a hard time finding what you're searching for. Maybe try a different path?
            <p>Let's go <RouterLink to="/">home</RouterLink> and try from there.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ErrorPageView',
    setup() {


        return {}
    }
})
</script>

<style scoped>
.mainbox {
    max-width: 600px;
    height: 100vh;
    margin: auto;
    text-align: center;
    padding: 1.5rem;
}

.err,
.err2 {
    color: var(--dark-blue);
    font-size: 10rem;
}

.far {
    font-size: 8.5rem;
    color: var(--whitish);
}

.msg {
    text-align: center;
    font-size: 1.2rem;
    font-weight: var(--font-medium);
}

a {
    text-decoration: none;
    color: var(--dark-blue-hover);
    font-weight: var(--font-medium);
}

a:hover {
    text-decoration: underline;
}

@media screen and (max-width: 600px) {

    .err,
    .err2 {
        font-size: 6rem;
    }

    .far {
        font-size: 5.1rem;
    }

    .msg {
        font-size: 0.9rem;
        padding: 0 2rem;
    }
}

@media screen and (max-width: 320px) {

    .err,
    .err2 {
        font-size: 5rem;
    }

    .far {
        font-size: 4.1rem;
    }

    .msg {
        font-size: 0.8rem;
        padding: 0rem;
    }
}

@media screen and (max-width: 280px) {

    .err,
    .err2 {
        font-size: 3.5rem;
    }

    .far {
        font-size: 2.8rem;
    }

    .msg {
        font-size: 0.6rem;
    }
}
</style>