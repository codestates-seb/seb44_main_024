export interface Movie {
  title: string;
  description: string;
  genre: string;
  running_time: string;
  poster_url: string;
  score: number;
  review_count: 6;
  스태프: Staff[];
  배우: Actor[];
}

export interface Staff {
  director: string;
}

export interface Actor {
  actor: string;
}

export interface Review {
  rev: ReviewContent[];
}

export interface ReviewContent {
  score: number;
  username: string;
  content: string;
  tags: Tag[];
  like: number;
}

export interface Tag {
  tag: string;
}

export interface Recommend {
  id: number;
  title: string;
  release_date: string;
  score: number;
  poster_url: string;
}

export interface MovieDataResponse {
  movie: Movie;
  review: Review;
  recommend: Recommend[];
}
