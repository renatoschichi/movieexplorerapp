import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './movie.reducer';

export const selectMovieState = createFeatureSelector<MovieState>('movie');

export const selectSearchResults = createSelector(
  selectMovieState,
  (state) => state.searchResults
);