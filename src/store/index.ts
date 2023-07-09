import { createStore } from "vuex";
import { db, auth, hospitalsCollectionRef } from "../firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default createStore({
  state: {
    user: null,
    currentUser: {
      firstName: "",
      lastName: "",
      email: "",
      firstNameInitial: "",
      profilePicture: "",
      profileId: "",
    },
    userLocation: null,
    userLGA: null,
    hospitals: [],
    updatingUserStatus: false,
    updatingUserMessage: "",
  },
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
    updateUserLocation(state, payload) {
      state.userLocation = payload;
    },
    updateUserLGA(state, payload) {
      state.userLGA = payload;
    },
    setHospitals(state, payload) {
      state.hospitals = payload;
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
    },
  },
  actions: {
    async getCurrentUser({ commit }) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        // console.log(userSnap)
        // console.log(userSnap.data())
        commit("setCurrentUser", userSnap);
      }
    },
    async updateUserDetails({ commit, state }, payload) {
      // console.log(payload)
      try {
        const userRef = doc(db, "users", state.currentUser.profileId);
        updateDoc(userRef, payload)
          .then(() => {
            // console.log("Profile successfully updated!");
            commit("updateUserInfo", payload);
            commit("setUpdatingUserStatus", false);
            commit(
              "setUpdatingUserMessage",
              'Changes saved! <span style="color: green;">✔</span>'
            );
          })
          .catch((error) => {
            console.error("Error updating profile: ", error);
            commit("setUpdatingUserStatus", false);
            commit(
              "setUpdatingUserMessage",
              'Error updating profile <span style="color: red;">✘</span>'
            );
          });
      } catch (error) {
        commit("setUpdatingUserStatus", false);
        commit(
          "setUpdatingUserMessage",
          'Error updating profile <span style="color: red;">✘</span>'
        );
        console.log(error);
      }
    },
    async getHospitals({ commit }, payload) {
      try {
        const q = query(
          hospitalsCollectionRef,
          where("hospital.state", "==", payload)
        );
        const querySnapshot = await getDocs(q);
        // type hospitalObj = {
        //   hospital: {
        //     LGA: string;
        //     facilityCode: string;
        //     facilityLevel: string;
        //     facilityName: string;
        //     facilityUID: string;
        //     ownership: string;
        //     state: string;
        //     ward: string;
        //   };
        const hospitals: any[] = [];
        querySnapshot.forEach((doc) => {
          hospitals.push(doc.data());
        });
        if (hospitals.length > 0) {
          // console.log("Hospitals in this state");
          commit("setHospitals", hospitals);
        } else {
          // console.log("No hospitals in this state");
          commit("setHospitals", []);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
