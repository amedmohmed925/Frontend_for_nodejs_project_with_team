import API from "./api";

export const signUp = async (data) => {
  try {
    const response = await API.post("/auth/signUp", data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error.response?.data || error.message);
    throw error;
  }
};

export const signIn = async (data) => {
  try {
    const response = await API.post("/auth/signIn", data);
    console.log(response.data);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data;
  } catch (error) {
    console.error("Error signing in:", error.response?.data || error.message);
    throw error;
  }
};
