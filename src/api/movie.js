import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});



export const getMovies = async () => {
  try {
    const response = await API.get("/movie/movies");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error.response?.data || error.message);
    throw error;
  }
};
export const addMovie = async (movieData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/movie", movieData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error adding movie:", error.response?.data || error.message);
      throw error;
    }
  };
  
  export const updateMovie = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.put(`/movie/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error updating movie:", error.response?.data || error.message);
      throw error;
    }
  };
export const getMovieById = async (id) => {
  try {
    const response = await API.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie by ID:", error.response?.data || error.message);
    throw error;
  }
};


export const rateMovie = async (id, rating) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.put(`/movie/rate/${id}`, { rating }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error rating movie:", error.response?.data || error.message);
      throw error;
    }
  };

export const deleteMovie = async (title) => {
  try {
    const response = await API.delete(`/movie/${title}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error.response?.data || error.message);
    throw error;
  }
};
