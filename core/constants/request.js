import axios from "axios";
import Cookies from "js-cookie";
import APP_CONFIG from "./app-config";

export function getLocalAccessToken() {
  const accessToken = localStorage.getItem("access_token");
  return accessToken;
}

const formDataHeaderUrls = [
  "api/services/order-description/",
  "api/experts/sample/",
];

const instance = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window != "undefined") {
      const token = getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        config.headers["Content-Type"] = formDataHeaderUrls.includes(config.url)
          ? "multipart/form-data"
          : "application/json";
      }
    }

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      // Remove the token from cookies
      Cookies.remove("token");
    }
    return res;
  },
  async (err) => {
    try {
      if (err.code === "ERR_NETWORK" || err.code === "ECONNABORTED") {
        return Promise.reject(err);
      }

      if (err.response?.status === 401) {
        Cookies.remove("token");
        // You can redirect or handle the unauthorized error as needed
        // window.location.href = `${getBaseUrl()}/auth/welcome`;
        return Promise.reject(err);
      }

      if (err.response?.status === 404) {
        return Promise.reject(err);
      }

      return Promise.reject(err);
    } catch (_error) {
      return Promise.reject(_error);
    }
  }
);

export default instance;
