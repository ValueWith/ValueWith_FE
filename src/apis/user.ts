import instance from '.';
import { LoginProps, SignUpProps } from './user.model';

// 이메일 인증 코드 요청
export const verifyEmail = async (email: string): Promise<void> => {
  try {
    const response = await instance.post('/api/auth/verify', {
      email,
    });
    return response.data;
  } catch (error) {
    return console.error('Error Fetching data: ', error);
  }
};

// 이메일 인증 코드 확인
export const verifyEmailCheck = async (email: string, code: string) => {
  try {
    const response = await instance.post('/api/auth/verify/check', {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    return console.error('Error Fetching data: ', error);
  }
};

// 회원가입
export const signupRequest = async (formData: any) => {
  try {
    const response = await instance.post('/api/auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 로그인
export const loginRequest = (data: LoginProps) => {
  return instance.post('/api/auth/signin', data);
};

// 토큰 갱신
export const tokenRefreshRequest = async () => {
  try {
    const response = await instance.post('/api/auth/refresh');
    localStorage.setItem('accessToken', response.data.accessToken);

    return response.data.accessToken;
  } catch (e) {
    console.log(e);
  }
};
