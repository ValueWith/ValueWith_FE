import axios from 'axios';
import { tokenRefreshRequest } from './user';

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (!config.headers) return config;
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // config.url이 /auth/token/refresh이면 토큰 갱신 요청이므로 중단
    // config._retry가 true이면 토큰 갱신 후 재요청이므로 중단(무한루프 방지 플래그)
    // 내부 속성이므로 플래그 이름에 _를 붙여 구분
    if (config.url === '/auth/token/refresh' || config._retry) {
      return Promise.reject(error);
    }

    if (response && response.status) {
      if (response.status === 401) {
        config._retry = true;
        const accessToken = await tokenRefreshRequest();

        // 토큰이 재발급 되었으면 헤더에 새로운 토큰을 넣어준다
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;

          // 액세스 토큰과 유저 정보를 로컬 스토리지에 저장
          localStorage.setItem('accessToken', response.data.accessToken);
        }

        // 중단된 요청을 토큰 갱신 후 재요청
        return instance(config);
      }

      switch (response.status) {
        case 400:
        case 404:
          return Promise.reject('API 요청에 실패했습니다.');
        case 500:
          return Promise.reject('서버에 오류가 발생했습니다.');
        default:
          return Promise.reject('알 수 없는 에러가 발생했습니다.');
      }
    } else {
      return Promise.reject('네트워크 오류가 발생했습니다.');
    }
  }
);

export default instance;
