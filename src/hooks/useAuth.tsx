import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signupRequest } from '@/apis/user';
import { SignUpProps } from '@/apis/user.model';
import { handleFetchAction } from '@/utils/fetchAction';

import imageCompression from 'browser-image-compression';

export interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

function useAuth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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

      const response = await signupRequest(data, formData);

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

  return {
    handleSignup,
    isLoading,
    showModal,
    modalProps,
  };
}

export default useAuth;
