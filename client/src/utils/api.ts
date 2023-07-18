import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', //추후 서버주소에 맞게 변경
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
