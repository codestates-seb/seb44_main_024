import API from './axiosinstance';
import { MyPageInfoRes } from '../types/User';

export async function getUserinfo(id: number) {
  try {
    const response = await API.get<MyPageInfoRes>(`/members/${id}`);
    console.log(response);
    return response.data;
  } catch {
    console.log('404 error');
  }
}
