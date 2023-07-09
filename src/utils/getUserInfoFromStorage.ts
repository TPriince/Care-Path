export const getUserLocationFromStorage = () => {
  const location = localStorage.getItem("location");
  // console.log(location)
  if (location) {
    return JSON.parse(location);
  } else {
    return null;
  }
};

export const getLGAFromStorage = () => {
  const LGA = localStorage.getItem("LGA");
  // console.log(LGA)
  if (LGA) {
    return JSON.parse(LGA);
  } else {
    return null;
  }
};

export const getHospitalsFromStorage = () => {
  const hospitals = localStorage.getItem("hospitals");
  // console.log(hospitals)
  if (hospitals) {
    return JSON.parse(hospitals);
  } else {
    return null;
  }
};
