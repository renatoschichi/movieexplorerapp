import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '5c653f8c';

  constructor(private http: HttpClient) {}

  searchMovie(title: string) {
    const apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}&t=${title}`;
    return this.http.get(apiUrl);
  }
}