import instance from '.';

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
export const registerRequest = async (data: any, file?: any) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
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
