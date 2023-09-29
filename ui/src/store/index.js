import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { TMDB_API_KEY, TMDB_API_URL } from "../utils/constants";

import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("gwadflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${TMDB_API_URL}genre/movie/list?api_key=${TMDB_API_KEY}`
  );
  return genres;
});

const createArrayFromRawData = (response, movies, genres) => {
  response.forEach((movie) => {
    const movieGenres = [];

    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });

    if (movie.backdrop_path) {
      movies.push({
        id: movie.id,
        name: movie.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genre: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const movies = [];
  for (let index = 1; movies.length < 60 && index < 10; index++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${index}` : ""}`);
    createArrayFromRawData(results, movies, genres);
  }
  return movies;
};

export const fetchMovies = createAsyncThunk(
  "gwadflix/trending",
  async ({ type }, thunkApi) => {
    const {
      gwadflix: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${TMDB_API_URL}trending/${type}/week?api_key=${TMDB_API_KEY}&with_genres=${genres}`,
      genres,
      true
    );
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  "gwadflix/genre",
  async ({ genre, type }, thunkApi) => {
    const {
      gwadflix: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${TMDB_API_URL}discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

const GwadflixSlice = createSlice({
  name: "GwadFlix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    gwadflix: GwadflixSlice.reducer,
  },
});
