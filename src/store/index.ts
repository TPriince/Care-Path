import { createStore } from "vuex";
import { db, auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default createStore({
  state: {
    user: null,
    currentUser: {
        firstName: '',
        lastName: '',
        email: '',
        userInitials: '',
        profileId: '',
      }
  },
  getters: {},
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    setCurrentUser(state, payload) {
      state.currentUser.firstName = payload.firstName;
      state.currentUser.lastName = payload.lastName;
      state.currentUser.email = payload.email;
      console.log(state.currentUser)
    },
    setCurrentUserInitials(state, payload) {
      state.currentUser.userInitials = payload.firstName.charAt(0) + payload.lastName.charAt(0);
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        commit("setCurrentUser", userSnap.data());
        commit("setCurrentUserInitials", userSnap.data());
      } else {
        console.log("No user is signed in.");
      }
    }
  },
  modules: {},
});
