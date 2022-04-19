import axios from "axios";

const baseURL = "https://dev.ynosit.it:8443/storebookings-1.0.0.45";

let token = "";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    if (sessionStorage.getItem("token")) {
      token = JSON.parse(sessionStorage.getItem("token"));
    } else if (localStorage.getItem("token")) {
      token = JSON.parse(localStorage.getItem("token"));
    }
    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
