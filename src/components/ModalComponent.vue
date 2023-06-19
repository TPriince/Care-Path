<template>
    <div class="modal">
        <div class="modal-content">
            <h3>{{ message }}</h3>
            <button @click="closeModal">Close</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ModalComponent',
    props: {
        message: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        const closeModal = () => {
            console.log(props.message)
            emit('close');
        }

        return {
            closeModal
        }
    }
})
</script>

<style scoped>
.modal {
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

.modal-content {
    max-width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    background-color: var(--whitish);
    padding: 32px 20px;
    border-radius: 18px;
    text-align: center;
}

.modal-content button {
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: var(--small-font-size);
    font-weight: var(--font-normal);
    transition: all 0.25s;
    background-color: var(--dark-blue);
    color: white;
}

.modal-content button:hover {
    background-color: var(--dark-blue-hover);
    font-weight: var(--font-medium);
}

@media screen and (max-width: 768px) {
    .modal-content {
        max-width: 250px;
        font-size: var(--small-font-size)
    }
}

@media screen and (max-width: 480px) {
    .modal-content {
        max-width: 200px;
        font-size: var(--smaller-font-size);
    }
}
</style>