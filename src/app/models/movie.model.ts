export interface Movie {
  Title: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Ratings: Rating[];
  Type: string;
}

export interface Rating {
  Source: string;
  Value: string;
}