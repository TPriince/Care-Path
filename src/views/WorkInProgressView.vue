<template>
    <div class="work-in-progress-wrapper">
        <h1>Work in progress</h1>
        <p>Currently in the process of crafting something incredible for you.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'WorkInProgressView',
})
</script>

<style scoped>
.work-in-progress-wrapper {
    text-align: center;
    height: 100%;
}

.work-in-progress-wrapper h1 {
    font-size: 2.5rem;
    color: var(--dark-blue);
    margin-top: 40px;
    margin-bottom: 20px;
}

.work-in-progress-wrapper p {
    color: var(--sm-text-color);
}
</style>