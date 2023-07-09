export interface Review {
  userId: number;
  userImg: string;
  userName: string;
  score: number;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
}

export interface Comment {
  userId: number;
  userImg: string;
  userName: string;
  content: string;
}
