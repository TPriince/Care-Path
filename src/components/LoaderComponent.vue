<template>
    <div class="loader">
        <div class="spinner"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LoaderComponent',
})
</script>

<style scoped>
.loader {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: var(--z-modal);
}

.spinner {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--whitish);
    border-bottom-color: var(--whitish);
    animation: loading 1s ease infinite;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>