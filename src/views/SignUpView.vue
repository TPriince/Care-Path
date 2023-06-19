<template>
  <section class="form-section">
    <div class="left-container">
            <!-- <RouterLink class="nav-logo" to="/"><span class="nav-logo__care">Care</span>Path</RouterLink> -->
            <div class="img-container">
                <img src="../assets/images/hero-image1.png" loading="lazy" />
            </div>
        </div>
        <div class="form-wrapper">
            <FormComponent activeLink="sign-up" />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormComponent from '../components/FormComponent.vue';
export default defineComponent({
    name: 'SignUpView',
    components: {
        FormComponent,
    },
    setup() {
        return {}
    }
})

</script>

<style scoped></style>