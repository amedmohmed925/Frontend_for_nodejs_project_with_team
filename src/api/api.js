import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.error("No refresh token available. Please log in again.");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/signin";
          return Promise.reject(error);
        }

        const { data } = await axios.post("http://localhost:8080/auth/refresh-token", { token: refreshToken });

        localStorage.setItem("token", data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return API(originalRequest);
      } catch (err) {
        console.error("Refresh token expired. Please log in again.");
        console.error(err);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
