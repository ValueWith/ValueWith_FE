import instance from '.';
import { LoginProps, SignUpProps } from './user.model';

// 이메일 인증 코드 요청
export const verifyEmail = async (email: string): Promise<void> => {
  try {
    const response = await instance.post('/api/auth/verify', null, {
      params: {
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    return console.error('Error Fetching data: ', error);
  }
};

// 이메일 인증 코드 확인
export const verifyEmailCheck = async (email: string, code: string) => {
  try {
    const response = await instance.post('/api/auth/verify/check', null, {
      params: {
        email,
        code,
      },
    });
    return response.data;
  } catch (error) {
    return console.error('Error Fetching data: ', error);
  }
};

// 회원가입
export const signupRequest = async (data: SignUpProps, formData?: any) => {
  try {
    const response = await instance.post('/api/auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { ...data },
    });

    return response;
  } catch (error) {
    return console.error('Error Fetching data: ', error);
  }
};

// 로그인
export function loginRequest(data: LoginProps) {
  return instance.post('/api/auth/signin', data);
}
