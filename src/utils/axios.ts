import axios from "axios";

const baseURL = "http://localhost:8080";

export const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;

    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    }

    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);
