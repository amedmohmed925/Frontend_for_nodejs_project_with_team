import API from "./api";


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
