import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie-service.service';
import { Movie } from 'src/app/models/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

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
    Poster: 'http://example.com/poster.jpg',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch movie data from API', () => {
    const searchTerm = 'Test Movie';

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
});
