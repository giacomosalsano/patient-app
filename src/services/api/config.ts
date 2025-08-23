import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUser = import.meta.env.VITE_API_USER;
const apiPassword = import.meta.env.VITE_API_PASS;

if (!apiBaseUrl || !apiUser || !apiPassword) {
  throw new Error("Missing API configuration");
}

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: apiUser,
    password: apiPassword,
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", {
      status: error.response?.status,
      message: error.response?.data || error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  },
);

export const apiConfig = {
  baseUrl: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${btoa(`${apiUser}:${apiPassword}`)}`,
  },
};
