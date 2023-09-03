import { createSelector } from '@ngrx/store';
import { MovieState } from './movie.reducer';

const selectMovieState = (state: { movies: MovieState }) => state.movies;

export const selectSearchResults = createSelector(
  selectMovieState,
  (state: MovieState) => state.searchResults
);

export const selectFavorites = createSelector(
  selectMovieState,
  (state: MovieState) => state.favorites
);