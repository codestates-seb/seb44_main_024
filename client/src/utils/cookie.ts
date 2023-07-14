import { Cookies } from 'react-cookie';
import type { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: CookieSetOptions): void => {
  const defaultOptions: CookieSetOptions = {
    path: '/', //모든 경로에서 쿠키 사용 가능
    httpOnly: true,
  };

  const mergedOptions = Object.assign({}, defaultOptions, options);
  cookies.set(name, value, mergedOptions);
};

export const getCookie = (name: string): string => {
  return cookies.get(name);
};

export const removeCookie = (name: string): void => {
  cookies.remove(name);
};
