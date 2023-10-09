export interface User {
  username: string;
  reviews: number;
  memberId: number;
}

export interface UserInfoRes {
  username: string;
  profile_Img: string;
  memberId: number;
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
