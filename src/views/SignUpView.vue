<template>
    <section class="form-section">
        <div class="left-container">
            <div class="img-container">
                <img src="../assets/images/care-path2.png" loading="lazy" />
            </div>
        </div>
        <div class="form-wrapper">
            <FormComponent activeLink="sign-up" @isLoading="value => showLoader = value" />
        </div>
        <LoaderComponent v-if="showLoader" />
    </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormComponent from '../components/FormComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
export default defineComponent({
    name: 'SignUpView',
    components: {
        FormComponent,
        LoaderComponent
    },
    setup() {
        const showLoader = ref(false);
        return {
            showLoader
        }
    }
})

</script>

<style scoped></style>
