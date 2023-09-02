import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieState } from 'src/app/store/movie/movie.reducer';
import { Movie } from 'src/app/models/movie.model';
import { selectSearchResults } from 'src/app/store/movie/movie.selector';

@Component({
  selector: 'app-favorite-titles',
  templateUrl: './favorite-titles.component.html',
  styleUrls: ['./favorite-titles.component.scss']
})
export class FavoriteTitlesComponent implements OnInit {
  favoriteMovies: Movie[] = [];

  constructor(private store: Store<{ movies: MovieState }>) {}

  ngOnInit(): void {
    this.store.select(selectSearchResults).subscribe((favorites) => {
      this.favoriteMovies = favorites;
    });
  }
}