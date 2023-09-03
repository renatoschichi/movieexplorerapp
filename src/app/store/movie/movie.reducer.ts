import { createReducer, on } from '@ngrx/store';
import {
  addMovieSuccess,
  removeMovie,
  clearResults,
  addToFavorites,
  removeFromFavorites,
  clearFavorites
} from './movie.actions';
import { Movie } from 'src/app/models/movie.model';

export const movieFeatureKey = 'movies';

export interface MovieState {
  searchResults: Movie[];
  favorites: Movie[];
}

const initialState: MovieState = {
  searchResults: [],
  favorites: []
};

const savedState = localStorage.getItem(movieFeatureKey);
const initialAppState: MovieState = savedState ? JSON.parse(savedState) : initialState;

export const movieReducer = createReducer(
  initialAppState,
  on(addMovieSuccess, (state, { movie }) => {
    const searchResults = [...state.searchResults, movie];
    const newState: MovieState = { ...state, searchResults };

    localStorage.setItem(movieFeatureKey, JSON.stringify(newState));

    return newState;
  }),
  on(removeMovie, (state, { movie }) => {
    const searchResults = state.searchResults.filter(m => m !== movie);
    const newState: MovieState = { ...state, searchResults };

    localStorage.setItem(movieFeatureKey, JSON.stringify(newState));

    return newState;
  }),
  on(clearResults, (state) => {
    const searchResults: Movie[] = [];
    const newState: MovieState = { ...state, searchResults };

    localStorage.setItem(movieFeatureKey, JSON.stringify(newState));

    return newState;
  }),
  on(addToFavorites, (state, { movie }) => {
    const favorites = [...state.favorites, movie];
    const newState: MovieState = { ...state, favorites };

    localStorage.setItem(movieFeatureKey, JSON.stringify(newState));

    return newState;
  }),
  on(removeFromFavorites, (state, { movie }) => {
    const favorites = state.favorites.filter((m) => m !== movie);
    const newState: MovieState = { ...state, favorites };

    localStorage.setItem(movieFeatureKey, JSON.stringify(newState));

    return newState;
  }),
  on(clearFavorites, (state) => {
    return { ...state, favorites: [] };
  })
);