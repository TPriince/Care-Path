<template>
  <main>
    <form class="profile-settings__section" @submit.prevent="saveChanges">
      <h1>Profile Settings</h1>
      <div class="profile-details-container">
        <div class="profile-image-or-firstname-initial">
          <img :src="userProfilePicture" alt="User profile picture" v-if="userProfilePicture" />
          <span v-else>{{ userFirstNameInitial }}</span>
        </div>
        <p><span>Admin</span></p>
        <div>
          <label>First Name</label>
          <input type="text" v-model="firstName" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" v-model="lastName" />
        </div>
        <div>
          <label>Email Name</label>
          <input type="email" v-model="email" disabled />
        </div>
      </div>
      <div class="save-btn-wrapper">
        <button class="save-btn">SAVE CHANGES</button>
      </div>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'ProfileView',
  setup() {
    const userProfilePicture = computed(() => store.state.currentUser.profilePicture);
    const userFirstNameInitial = computed(() => store.state.currentUser.firstNameInitial);

    const state = reactive({
      firstName: store.state.currentUser.firstName,
      lastName: store.state.currentUser.lastName,
      email: store.state.currentUser.email,
    });

    const saveChanges = () => {
      if (state.firstName && state.lastName) {
        store.commit('setUpdatingUserStatus', true);
        store.dispatch('updateUserDetails', {
          firstName: state.firstName,
          lastName: state.lastName,
        });
      } else {
        store.commit('setUpdatingUserMessage', 'Please fill in all fields');
      }
    }

    return {
      userProfilePicture,
      userFirstNameInitial,
      ...toRefs(state),
      saveChanges,
    }
  }
})
</script>

<style scoped>
.profile-settings__section {
  max-width: 600px;
  margin: 20px auto;
}

.profile-settings__section h1 {
  text-align: center;
  font-size: var(--h2-font-size);
}

.profile-details-container p {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
}

.profile-details-container p span {
  font-weight: var(--font-normal);
  border-radius: 5px;
  padding: 0.3rem 0.6rem;
  background-color: var(--dark-blue);
  color: white;
}

.profile-details-container {
  background-color: lightgray;
  padding: 2rem;
  border-radius: 10px;
  margin-top: 10px;
}

.profile-image-or-firstname-initial {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: var(--dark-blue);
    color: var(--whitish);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-size: var(--h2-font-size);
    margin: auto;
}

.profile-image-or-firstname-initial img {
    max-width: 100%;
    height: auto;
}

.profile-details-container div {
    margin-bottom: 1rem;
}

label {
    display: block;
    font-size: var(--normal-font-size);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

input {
    background: #dfdfe0;
    border: 0;
    border-radius: 8px;
    width: 100%;
    font-size: 0.9rem;
    text-indent: 10px;
    padding: 8px 10px;
}

input::placeholder {
  font-size: 0.9rem;
}

input:focus {
  outline: none;
}

.save-btn-wrapper {
  text-align: center;
  margin-top: 1rem;
}

.save-btn {
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: var(--small-font-size);
  font-weight: var(--font-normal);
  transition: all 0.25s;
  background-color: var(--dark-blue);
  color: white;
}

.save-btn:hover {
    background-color: var(--dark-blue-hover);
    font-weight: var(--font-medium);
}
</style>