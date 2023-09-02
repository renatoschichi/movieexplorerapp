import { createReducer, on } from '@ngrx/store';
import { addMovieSuccess, removeMovie, clearResults, addToFavorites, removeFromFavorites } from './movie.actions';
import { Movie } from 'src/app/models/movie.model';

export interface MovieState {
  searchResults: Movie[];
  favorites: Movie[];
}

const initialState: MovieState = {
  searchResults: [],
  favorites: []
};

export const movieReducer = createReducer(
  initialState,
  on(addMovieSuccess, (state, { movie }) => {
    return { ...state, searchResults: [...state.searchResults, movie] };
  }),
  on(removeMovie, (state, { movie }) => {
    return { ...state, searchResults: state.searchResults.filter(m => m !== movie) };
  }),
  on(clearResults, (state) => {
    return { ...state, searchResults: [] };
  }),
  on(addToFavorites, (state, { movie }) => {
    return { ...state, favorites: [...state.favorites, movie] };
  }),
  on(removeFromFavorites, (state, { movie }) => {
    return { ...state, favorites: state.favorites.filter(m => m !== movie) };
  })
);