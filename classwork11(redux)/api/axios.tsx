import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use((config) => {
  console.log(config);
  config.headers.autorization = "sadasodjasiojd";
  return config;
});

instance.interceptors.response.use((config) => {
  console.log(config);
  return config.data;
});

export default instance;
