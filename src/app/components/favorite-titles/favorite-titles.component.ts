import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieState } from 'src/app/store/movie/movie.reducer';
import { Movie } from 'src/app/models/movie.model';
import { selectFavorites } from 'src/app/store/movie/movie.selector';
import * as MovieActions from 'src/app/store/movie/movie.actions';

@Component({
  selector: 'app-favorite-titles',
  templateUrl: './favorite-titles.component.html',
  styleUrls: ['./favorite-titles.component.scss']
})
export class FavoriteTitlesComponent implements OnInit {
  favoriteMovies: Movie[] = [];

  constructor(private store: Store<{ movies: MovieState }>) {}

  ngOnInit(): void {
    this.store.select(selectFavorites).subscribe((favorites) => {
      this.favoriteMovies = favorites;
    });
  }

  removeFromFavorites(movie: Movie) {
    this.store.dispatch(MovieActions.removeFromFavorites({ movie }));
  }  
}