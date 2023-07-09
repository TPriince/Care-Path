import axios from "axios";
import store from "../store";

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      axios
        .get("https://feroeg-reverse-geocoding.p.rapidapi.com/address", {
          headers: {
            "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`,
            "X-RapidAPI-Host": "feroeg-reverse-geocoding.p.rapidapi.com",
          },
          params: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            lang: "en",
            mode: "text",
            format: "'[SN[, ] - [23456789ab[, ]'",
          },
        })
        .then((response) => {
          // console.log(response.data);
          const address = response.data;
          const addressArr = address.split(", ");
          if (addressArr[1] === "Federal Capital Territory") {
            const state = "FCT";
            localStorage.setItem("location", JSON.stringify(state));
            store.commit("updateUserLocation", state);
            store.dispatch("getHospitals", state);
          } else {
            const state = addressArr[1].split(" ")[0];
            localStorage.setItem("location", JSON.stringify(state));
            store.commit("updateUserLocation", state);
            store.dispatch("getHospitals", state);
          }
          const LGA = addressArr[2];
          // console.log(state, LGA);
          localStorage.setItem("LGA", JSON.stringify(LGA));
          store.commit("updateUserLGA", LGA);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

export default getUserLocation;
