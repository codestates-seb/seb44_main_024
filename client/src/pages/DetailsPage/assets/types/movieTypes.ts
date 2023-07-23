export interface Movie {
  docId: string;
  title: string;
  titleEng: string;
  description: string;
  genre: string;
  runtime: string;
  repRlsDate: string;
  nation: string;
  rating: string;
  posterUrl: string;
  score: number;
  review_count: number;
  directorNm: string;
  trailer: null | string;
  backdrop: null | string;
  actors: Actor[];
  stills: string[];
  reviews: ReviewContent[];
}

export interface Actor {
  actor: string;
  role: string;
}

export interface ReviewContent {
  docId: string;
  reviewId: number;
  score: number;
  content: string;
  likes: number;
  tags: string[];
  user: User; // 백엔드쪽에서 아직구현x
}

export interface User {
  memberId: number;
  username: string;
  profile_img: string;
}

// search 데이터에서도 사용(같은 형태)
export interface Recommend {
  docId: string;
  title: string;
  repRlsDate: string;
  score: number;
  posterUrl: string;
}

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface MovieDetailData {
  movie: Movie;
  pageInfo: PageInfo;
  recommended_movies: Recommend[];
}
