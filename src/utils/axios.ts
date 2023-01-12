import axios from "axios";

const baseURL: any = "http://localhost:8080";

export const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;

    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);
