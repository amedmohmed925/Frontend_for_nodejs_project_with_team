import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});



export const getUserFavList = async () => {
  try {
    const response = await API.get("/user/favList");
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite list:", error.response?.data || error.message);
    throw error;
  }
};

export const updateUserFavList = async (id) => {
  try {
    const response = await API.put(`/user/favList/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error updating favorite list:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserWatchLater = async () => {
  try {
    const response = await API.get("/user/watchLater");
    return response.data;
  } catch (error) {
    console.error("Error fetching watch later list:", error.response?.data || error.message);
    throw error;
  }
};

export const updateUserWatchLater = async (id) => {
  try {
    const response = await API.put(`/user/watchLater/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error updating watch later list:", error.response?.data || error.message);
    throw error;
  }
};
