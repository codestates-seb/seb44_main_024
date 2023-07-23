import { setCookie } from '../cookie';

export const saveTokenFromResponse = (response: Response) => {
  const authHeader = response.headers.get('Authorization');

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    console.log('추출된 JWT 토큰:', token);
    setCookie('jwtToken', token);
  }
};
