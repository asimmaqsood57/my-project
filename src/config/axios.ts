import http from "axios";

const axios = http.create({
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: process.env.REACT_APP_SERVER,
});

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      "Content-Language": localStorage.getItem("i18nextLng"),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
