import API from "./api";
import axios from "axios";

export const getMovies = async () => {
  try {
    const response = await API.get("/movie/movies");
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error.response?.data || error.message);
    throw error;
  }
};

export const addMovie = async (movieData) => {
  try {
    const response = await API.post("/movie", movieData);
    return response.data;
  } catch (error) {
    console.error("Error adding movie:", error.response?.data || error.message);
    throw error;
  }
};


export const updateMovie = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`http://localhost:8080/movie/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
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
    const response = await API.put(`/movie/rate/${id}`, { rating });
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
