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
        firstNameInitial: '',
        profilePicture: '',
        // profileId: '',
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
      state.currentUser.firstNameInitial = payload.firstName[0];
      state.currentUser.profilePicture = payload.profilePicture;
      // console.log(state.currentUser)
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        // console.log(userSnap.data())
        if (userSnap.data()?.firstName) {
          commit("setCurrentUser", userSnap.data());
        }
      } else {
        console.log("No user is signed in.");
      }
    }
  },
  modules: {},
});
