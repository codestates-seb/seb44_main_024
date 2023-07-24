import API from './axiosinstance';
import { MyPageInfoRes } from '../types/User';

export async function getUserinfo(id: number) {
  try {
    //id 파라미터 변경되어야 함
    const response = await API.get<MyPageInfoRes>(`/members/${id}`);
    // console.log(response);
    return response.data;
  } catch {
    console.log('404 error');
  }
}
