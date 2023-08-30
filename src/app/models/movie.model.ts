export interface Movie {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Country: string;
  Ratings: Rating[];
  Type: string;
  Poster: string;
}

export interface Rating {
  Source: string;
  Value: string;
}