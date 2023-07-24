import { Cookies } from 'react-cookie';
import type { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: CookieSetOptions) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string): string => {
  return cookies.get(name);
};

export const removeCookie = (name: string): void => {
  cookies.remove(name);
};
