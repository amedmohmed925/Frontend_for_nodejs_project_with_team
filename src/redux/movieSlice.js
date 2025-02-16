import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovies} from "../api/movie";
import {updateUserFavList} from "../api/FavList"
import {updateUserWatchLater} from "../api/FavList"

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (_, { rejectWithValue }) => {
  try {
    return await getMovies();
  } catch (error) {
    return rejectWithValue(error);
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: { movies: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;


export const updateFavList = createAsyncThunk("user/updateFavList", async (movieId, { rejectWithValue }) => {
  try {
    return await updateUserFavList(movieId);
  } catch (error) {
    return rejectWithValue(error);
  }
});


export const updateWatchLater = createAsyncThunk("user/updateWatchLater", async (movieId, { rejectWithValue }) => {
  try {
    return await updateUserWatchLater(movieId);
  } catch (error) {
    return rejectWithValue(error);
  }
});
