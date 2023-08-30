import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie-service/movie-service.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Movie[] = [];

  constructor(
    private movieService: MovieService
  ) {
    this.searchResults = this.movieService.getSavedSearchResults();
  }

  ngOnInit(): void {
  }

  searchMovies() {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.movieService.searchMovie(this.searchQuery).subscribe(
      (data: any) => {
        if (data.Response === 'True') {
          this.searchResults.push(data as Movie);
          this.searchQuery = '';
          this.movieService.saveSearchResults(this.searchResults);
        } else {
          this.searchResults = [];
        }
      },
      (error) => {
        console.log(error);
        this.searchResults = [];
      }
    );
  }

  removeMovie(movie: Movie) {
    const index = this.searchResults.indexOf(movie);
    if (index !== -1) {
      this.searchResults.splice(index, 1);
      this.movieService.saveSearchResults(this.searchResults);
    }
  }

  clearResults() {
    this.searchResults = [];
    this.movieService.saveSearchResults(this.searchResults);
  }
  
}
