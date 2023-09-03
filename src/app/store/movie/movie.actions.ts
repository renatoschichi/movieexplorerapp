import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/models/movie.model';

export const addMovie = createAction(
  '[Movie] Add Movie',
  props<{ movie: Movie }>()
);

export const removeMovie = createAction(
  '[Movie] Remove Movie',
  props<{ movie: Movie }>()
);

export const clearResults = createAction('[Movie] Clear Results');

export const addMovieSuccess = createAction(
  '[Movie] Add Movie Success',
  props<{ movie: Movie }>()
);

export const addMovieFailure = createAction(
  '[Movie] Add Movie Failure',
  props<{ error: string }>()
);

export const addToFavorites = createAction(
  '[Movie] Add To Favorites',
  props<{ movie: Movie }>()
);

export const removeFromFavorites = createAction(
  '[Movie] Remove From Favorites',
  props<{ movie: Movie }>()
);

export const clearFavorites = createAction('[Movie] Clear Favorites');