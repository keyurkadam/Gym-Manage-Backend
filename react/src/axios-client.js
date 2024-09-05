import axios from "axios";
import { useStateContext } from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log("axios-client rr", response);
    return response;
  },
  (error) => {
    const { response } = error;
    console.log("axios-client", response);
    if (response && response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      // window.location.reload();
    } else if (response && response.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export default axiosClient;
