import axios, { AxiosInstance } from 'axios';

const baseURL = 'http://localhost:5173';

const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      response: { status },
    } = error;

    if (status) {
      switch (status) {
        case 400:
        case 404:
          return Promise.reject('API 요청에 실패했습니다.');
        case 401:
          return Promise.reject('로그인이 필요합니다.');
        case 500:
          return Promise.reject('서버에 오류가 발생했습니다.');
        default:
          return Promise.reject('알 수 없는 에러가 발생했습니다.');
      }
    } else {
      return Promise.reject('알 수 없는 에러가 발생했습니다.');
    }
  }
);

export default instance;
