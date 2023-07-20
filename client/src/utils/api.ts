import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-54-180-85-209.ap-northeast-2.compute.amazonaws.com:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
