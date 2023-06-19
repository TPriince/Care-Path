<template>
  <MainComponent>
      <SearchComponent />
  </MainComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainComponent from '../components/MainComponent.vue';
import SearchComponent from '../components/SearchComponent.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
      MainComponent,
      SearchComponent
  },
  setup () {
      

      return {}
  }
})
</script>

<style scoped>

</style>