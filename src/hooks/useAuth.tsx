import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginRequest, signupRequest } from '@/apis/user';
import { LoginProps, SignUpProps } from '@/apis/user.model';

import imageCompression from 'browser-image-compression';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState } from '@/recoil/userState';
import { modalState } from '@/recoil/modalState';

export interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

function useAuth() {
  const navigate = useNavigate();

  const setIsLogin = useSetRecoilState(loginState);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  // 회원가입
  const handleSignup = async (data: SignUpProps, file?: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append('nickname', data.nickname);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('gender', data.gender);
      formData.append('age', data.age);

      if (file) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        };

        const compressedFile = await imageCompression(file, options);
        formData.append('file', compressedFile);
      } else {
        formData.append('file', '');
      }

      const response = await signupRequest(formData);

      const successProps = {
        title: '회원가입 성공',
        message: '회원가입이 완료되었습니다.',
        onConfirm: () => {
          navigate('/login');
        },
      };

      setModalDataState({
        isModalOpen: true,
        title: '회원가입 성공',
        message: '회원가입에 완료되었습니다.',
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });
          navigate('/login');
        },
      });

      return response;
    } catch (error) {
      setModalDataState({
        isModalOpen: true,
        title: '회원가입 실패',
        message: '회원가입에 실패하였습니다. 다시 시도해주세요.',
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });
        },
      });

      return console.error('Error Fetching data: ', error);
    }
  };

  // 로그인
  const handleLogin = async (data: LoginProps) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await loginRequest(data);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem(
        'userInfo',
        JSON.stringify(response.data.loginMemberIdDto)
      );
      setIsLogin(true);
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      setIsError(true);

      return console.error('Error Fetching data: ', error);
    }
  };

  return {
    handleSignup,
    handleLogin,
    isLoading,
    isError,
  };
}

export default useAuth;
