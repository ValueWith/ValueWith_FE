import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginRequest, signupRequest } from '@/apis/user';
import { LoginProps, SignUpProps } from '@/apis/user.model';
import { handleFetchAction } from '@/utils/fetchAction';

import imageCompression from 'browser-image-compression';
import { useSetRecoilState } from 'recoil';
import { loginState } from '@/recoil/userState';

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
  const [modalProps, setModalProps] = useState<ModalProps>({
    title: '',
    message: '',
    onConfirm: () => {
      setIsShowModal(false);
    },
  });

  const [showModal, setIsShowModal] = useState(false);

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

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      };

      const compressedFile = await imageCompression(file, options);

      if (file) {
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

      handleFetchAction(
        setIsLoading,
        setIsShowModal,
        setModalProps,
        successProps
      );

      return response;
    } catch (error) {
      const errorProps = {
        title: '회원가입 실패',
        message: '회원가입에 실패하였습니다.',
        onConfirm: () => {
          navigate('/signup');
        },
      };

      handleFetchAction(
        setIsLoading,
        setIsShowModal,
        setModalProps,
        errorProps
      );

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
    showModal,
    modalProps,
  };
}

export default useAuth;
