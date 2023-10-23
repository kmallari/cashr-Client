import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});

export default axiosInstance;
