import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { Store } from '@ngrx/store';
import { MovieState } from 'src/app/store/movie/movie.reducer';
import * as MovieActions from 'src/app/store/movie/movie.actions';
import { selectSearchResults } from 'src/app/store/movie/movie.selector';
import { MovieService } from 'src/app/services/movie-service/movie-service.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Movie[] = [];
  error: string = '';

  constructor(
    private movieService: MovieService,
    private store: Store<{ movies: MovieState }>
  ) {
    this.store.select('movies').subscribe((state) => {
      this.searchResults = state.searchResults;
    });
  }

  ngOnInit(): void {
    this.store.select(selectSearchResults).subscribe((searchResults) => {
      this.searchResults = searchResults;
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
          this.addToFavorites(movieToAdd);
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
    if (this.isFavorite(movie)) {
      this.removeFromFavorites(movie);
    } else {
      this.addToFavorites(movie);
    }
  }

  addToFavorites(movie: Movie) {
    this.store.dispatch(MovieActions.addToFavorites({ movie }));
  }

  removeFromFavorites(movie: Movie) {
    this.store.dispatch(MovieActions.removeFromFavorites({ movie }));
  }

  isFavorite(movie: Movie): boolean {
    return this.searchResults.some(m => m === movie);
  }

  removeMovie(movie: Movie) {
    this.store.dispatch(MovieActions.removeMovie({ movie }));
  }

  clearResults() {
    this.store.dispatch(MovieActions.clearResults());
  }
}