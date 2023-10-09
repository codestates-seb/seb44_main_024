// import axios from 'axios';
import API from './axiosinstance';
import { BookmarkDataResponse } from '../types/User';

export async function getMyBookmarks(id: number) {
  try {
    const response = await API.get<BookmarkDataResponse>(`/members/${id}/reviews`);
    return response.data;
  } catch {
    console.log('404 error');
  }
}
