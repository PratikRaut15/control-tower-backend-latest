const axios = require("axios");

module.exports = baseURL => {
  console.log("base url iss: " + baseURL);
  return axios.create({
    baseURL: baseURL
  });
};
