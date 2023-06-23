<template>
    <div class="mainbox">
        <span class="err">4</span>
        <i class="far fa-question-circle fa-spin"></i>
        <span class="err2">4</span>
        <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
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
    margin: auto;
    width: 600px;
    height: 600px;
    position: relative;
}

.err {
    color: var(--dark-blue);
    font-size: 10rem;
    position: absolute;
    left: 20%;
    top: 8%;
}

.far {
    position: absolute;
    font-size: 8.5rem;
    left: 42%;
    top: 16%;
    color: var(--whitish);
}

.err2 {
    color: var(--dark-blue);
    font-size: 10rem;
    position: absolute;
    left: 68%;
    top: 8%;
}

.msg {
    text-align: center;
    font-size: 1.2rem;
    position: absolute;
    left: 16%;
    top: 45%;
    width: 75%;
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
</style>