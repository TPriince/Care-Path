import { createStore } from "vuex";
import { db, usersColecctionRef } from "../firebase/config";

export default createStore({
  state: {
    user: null,
    firstName: '',
    lastName: '',
    email: '',
    profileId: '',
    userInitials: '',
      
      // currentUser: {
      //   firstName: '',
      //   lastName: '',
      //   email: '',
      //   profileId: '',
      // }
  },
  getters: {},
  mutations: {},
  actions: {
    // async getCurrentUser({ commit }) {
    //   const database = 
  },
  modules: {},
});
