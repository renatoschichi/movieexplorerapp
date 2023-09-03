import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie-service/movie-service.service';

import { Store } from '@ngrx/store';

import * as MovieActions from 'src/app/store/movie/movie.actions';
import { MovieState } from 'src/app/store/movie/movie.reducer';
import { selectSearchResults, selectFavorites } from 'src/app/store/movie/movie.selector';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Movie[] = [];
  error: string = '';
  favoriteMovies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private store: Store<{ movies: MovieState }>
  ) {
    this.store.select('movies').subscribe((state) => {
      this.searchResults = state.searchResults;
    });
    this.store.select(selectSearchResults).subscribe((searchResults) => {
      this.searchResults = searchResults;
    });
  }

  ngOnInit(): void {
    this.store.select(selectSearchResults).subscribe((searchResults) => {
      this.searchResults = searchResults;
    });
    this.store.select(selectFavorites).subscribe((favorites) => {
      this.favoriteMovies = favorites;
    });
  }

  searchMovies() {
    this.error = '';

    if (this.searchQuery.trim() === '') {
      this.store.dispatch(MovieActions.clearResults());
      return;
    }

    this.movieService.searchMovie(this.searchQuery).subscribe(
      (data: any) => {
        if (data.Response === 'True') {
          const movieToAdd: Movie = {
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
            Poster: data.Poster
          };
          this.store.dispatch(MovieActions.addMovie({ movie: movieToAdd }));
          this.searchQuery = '';
        } else {
          this.error = 'Título não encontrado';
          this.store.dispatch(MovieActions.clearResults());
        }
      },
      (error) => {
        console.log(error);
        this.error = 'Erro na busca do título';
        this.store.dispatch(MovieActions.clearResults());
      }
    );
  }

  toggleFavorite(movie: Movie) {
    const isFavorite = this.isFavorite(movie);

    if (isFavorite) {
      this.store.dispatch(MovieActions.removeFromFavorites({ movie }));
    } else {
      this.store.dispatch(MovieActions.addToFavorites({ movie }));
    }
  }

  isFavorite(movie: Movie): boolean {
    return this.favoriteMovies.some((m) => m.Title === movie.Title);
  }  

  removeMovie(movie: Movie) {
    this.store.dispatch(MovieActions.removeMovie({ movie }));
  }

  clearResults() {
    this.store.dispatch(MovieActions.clearResults());
  }
}