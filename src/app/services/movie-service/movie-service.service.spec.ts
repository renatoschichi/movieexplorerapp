import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie, Rating } from 'src/app/models/movie.model';
import { MovieService } from './movie-service.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

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
    },
    {
      Title: 'Movie 2',
      Year: '2023',
      Runtime: '150 min',
      Genre: 'Drama',
      Director: 'Director 2',
      Actors: 'Actor 2',
      Plot: 'Plot 2',
      Country: 'Spain',
      Ratings: [],
      Type: 'movie',
      Poster: 'http://example.com/poster2.jpg'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movie data', () => {
    const searchTerm = 'Test Movie';
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

    service.searchMovie(searchTerm).subscribe(
      (data: any) => {
        expect(data).toEqual(dummyMovie);
      },
      (error: any) => {
        fail('Should not call the error callback');
      }
    );

    const req = httpMock.expectOne(`http://www.omdbapi.com/?apikey=${service['apiKey']}&t=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovie);
  });

  it('should save and retrieve search results', () => {
    service.saveSearchResults(dummyResults);
    const retrievedResults = service.getSavedSearchResults();

    expect(retrievedResults).toEqual(dummyResults);
  });
});