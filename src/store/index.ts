import { createStore } from "vuex";
import { db, auth } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default createStore({
  state: {
    user: null,
    currentUser: {
        firstName: '',
        lastName: '',
        email: '',
        firstNameInitial: '',
        profilePicture: '',
        profileId: '',
      },
    updatingUserStatus: false,
    updatingUserMessage: '',
  },
  getters: {},
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    setCurrentUser(state, payload) {
      state.currentUser.firstName = payload.data().firstName;
      state.currentUser.lastName = payload.data().lastName;
      state.currentUser.email = payload.data().email;
      state.currentUser.firstNameInitial = payload.data().firstName[0];
      state.currentUser.profilePicture = payload.data().profilePicture;
      state.currentUser.profileId = payload.id;
      // console.log(state.currentUser)
    },
    updateUserInfo(state, payload) {
      state.currentUser.firstName = payload.firstName;
      state.currentUser.lastName = payload.lastName;
      state.currentUser.firstNameInitial = payload.firstName[0];
      // state.currentUser.profilePicture = payload.profilePicture;
    },
    setUpdatingUserStatus(state, payload) {
      state.updatingUserStatus = payload;
    },
    setUpdatingUserMessage(state, payload) {
      state.updatingUserMessage = payload;
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        // console.log(userSnap)
        // console.log(userSnap.data())
        if (userSnap) {
          commit("setCurrentUser", userSnap);
        }
      } else {
        console.log("No user is signed in.");
      }
    },
    async updateUserDetails({ commit, state }, payload) {
      // console.log(payload)
      const userRef = doc(db, "users", state.currentUser.profileId);
        updateDoc(userRef, payload)
          .then(() => {
            console.log("Document successfully updated!");
            commit("updateUserInfo", payload);
            commit("setUpdatingUserStatus", false);
            commit("setUpdatingUserMessage", 'Changes saved! <span style="color: green;">✔</span>');
          }
          ).catch((error) => {
            console.error("Error updating profile: ", error);
          }
          );
    }
  },
  modules: {},
});
