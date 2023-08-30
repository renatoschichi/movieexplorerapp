import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/app/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '5c653f8c';
  private localStorageKey = 'movieSearchResults';

  constructor(private http: HttpClient) {}

  searchMovie(title: string) {
    const apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}&t=${title}`;
    return this.http.get(apiUrl);
  }

  saveSearchResults(results: Movie[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(results));
  }

  getSavedSearchResults(): Movie[] {
    const savedResults = localStorage.getItem(this.localStorageKey);
    return savedResults ? JSON.parse(savedResults) : [];
  }
}