export interface User {
  username: string;
  password: string;
  image: string;
  reviews: number;
}

export interface MyPageInfoRes {
  username: string;
  profile_Img: string;
}

export interface BookmarkDataResponse {
  movie: {
    docId: number;
    title: string;
    repRlsDate: string;
    posterUrl: string;
  };
  rev: {
    score: number;
    username: string;
    content: string;
    tags: string[];
    like: number;
  };
}
