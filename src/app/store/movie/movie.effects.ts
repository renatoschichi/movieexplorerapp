import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieService } from 'src/app/services/movie-service/movie-service.service';
import { addMovie, addMovieSuccess, addMovieFailure } from './movie.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions, private movieService: MovieService) {}

  searchMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMovie),
      mergeMap(action =>
        this.movieService.searchMovie(action.movie.Title).pipe(
          map((data: any) => {
            const movie = {
              Title: data.Title,
              Year: data.Year,
              Runtime: data.Runtime,
              Genre: data.Genre,
              Director: data.Director,
              Actors: data.Actors,
              Plot: data.Plot,
              Country: data.Country,
              Ratings: data.Ratings,
              Type: data.Type,
              Poster: data.Poster,
            };

            return addMovieSuccess({ movie });
          } ),
          catchError(error => {
            console.error(error);

            return of(addMovieFailure({ error: 'Search Failed' }));
          })
        )
      )
    )
  );
}