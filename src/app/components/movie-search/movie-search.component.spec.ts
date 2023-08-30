import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieSearchComponent } from './movie-search.component';
import { MovieService } from 'src/app/services/movie-service/movie-service.service';
import { Movie } from 'src/app/models/movie.model';
import { of } from 'rxjs';

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const dummyMovie: Movie = {
    Title: 'Test Movie',
    Year: '2023',
    Runtime: '120 min',
    Genre: 'Action',
    Director: 'John Doe',
    Actors: 'Jane Doe, Michael Smith',
    Plot: 'A test plot.',
    Country: 'USA',
    Ratings: [{ Source: 'Rotten Tomatoes', Value: '90%' }],
    Type: 'movie',
    Poster: 'http://example.com/poster.jpg'
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MovieService', ['searchMovie', 'getSavedSearchResults', 'saveSearchResults']);

    TestBed.configureTestingModule({
      declarations: [MovieSearchComponent],
      providers: [{ provide: MovieService, useValue: spy }]
    });

    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for movies', fakeAsync(() => {
    movieServiceSpy.searchMovie.and.returnValue(of(dummyMovie));
    const searchQuery = 'Test Movie';
    component.searchQuery = searchQuery;

    component.searchMovies();
    tick();

    expect(movieServiceSpy.searchMovie).toHaveBeenCalledWith(searchQuery);
    expect(component.searchResults.length).toBe(1);
    expect(component.searchQuery).toBe('');
    expect(movieServiceSpy.saveSearchResults).toHaveBeenCalledWith(component.searchResults);
  }));

  it('should clear search results', () => {
    const dummyResults: Movie[] = [
      {
        Title: 'Movie 1',
        Year: '2022',
        Runtime: '120 min',
        Genre: 'Action',
        Director: 'Director 1',
        Actors: 'Actor 1',
        Plot: 'Plot 1',
        Country: 'USA',
        Ratings: [],
        Type: 'movie',
        Poster: 'http://example.com/poster1.jpg'
      }
    ];
    movieServiceSpy.getSavedSearchResults.and.returnValue(dummyResults);

    component.clearResults();

    expect(component.searchResults).toEqual([]);
    expect(movieServiceSpy.saveSearchResults).toHaveBeenCalledWith(component.searchResults);
  });

  it('should remove a movie from search results', () => {
    const dummyResults: Movie[] = [
      {
        Title: 'Movie 1',
        Year: '2022',
        Runtime: '120 min',
        Genre: 'Action',
        Director: 'Director 1',
        Actors: 'Actor 1',
        Plot: 'Plot 1',
        Country: 'USA',
        Ratings: [],
        Type: 'movie',
        Poster: 'http://example.com/poster1.jpg'
      }
    ];
    movieServiceSpy.getSavedSearchResults.and.returnValue(dummyResults);
    component.searchResults = dummyResults;

    const movieToRemove = dummyResults[0];
    component.removeMovie(movieToRemove);

    expect(component.searchResults.length).toBe(1);
    expect(component.searchResults).not.toContain(movieToRemove);
    expect(movieServiceSpy.saveSearchResults).toHaveBeenCalledWith(component.searchResults);
  });
});
