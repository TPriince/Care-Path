import axios from "axios";
import store from "../store";

const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      axios
        .get("https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse", {
          headers: {
            "X-RapidAPI-Key": `${process.env.VUE_APP_RAPID_API_KEY}`,
            "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
          },
          params: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            "accept-language": "en",
            polygon_threshold: "0.0",
          },
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.address.state === "Federal Capital Territory") {
            const state = "FCT";
            // console.log(state);
            localStorage.setItem("location", JSON.stringify(state));
            store.commit("updateUserLocation", state);
            store.dispatch("getHospitals", state);
          } else {
            const state = response.data.address.state.split(" ")[0];
            // console.log(state);
            localStorage.setItem("location", JSON.stringify(state));
            store.commit("updateUserLocation", state);
            store.dispatch("getHospitals", state);
          }
          const LGA =
            response.data.address.county ||
            response.data.address.city ||
            response.data.address.suburb ||
            "";
          // console.log(LGA);
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
