import instance from '.';

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
