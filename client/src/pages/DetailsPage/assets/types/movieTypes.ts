export interface Movie {
  docId: number;
  title: string;
  titleEng: string;
  description: string;
  genre: string;
  runtime: string; // number로 들어올 수도 있음
  repRlsDate: string; // number로 들어올 수도 있음
  nation: string;
  rating: string;
  posterUrl: string;
  score: number;
  review_count: number; // string으로 들어올 수도 있음
  directorNm: string;
  actors: Actor[];
  stills: Still[];
}

export interface Actor {
  actor: string;
}

export interface Still {
  still: string;
}

export interface ReviewList {
  rev: ReviewContent[];
}

export interface ReviewContent {
  docId: number;
  reviewId: number;
  score: number;
  content: string;
  like: number; // string으로 들어올 수도 있음
  tags: Tag[];
  user: User[];
}

export interface Tag {
  tag: string;
}

export interface User {
  userId: number;
  username: string;
  profile_Img: string;
}

export interface Recommend {
  docId: number;
  title: string;
  reqRlsDate: string; // number로 들어올 수도 있음
  score: number;
  posterUrl: string;
}

export interface MovieDetailData {
  movie: Movie;
  review: ReviewList;
  recommend: Recommend[];
}
