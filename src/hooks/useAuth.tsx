import instance from '@/apis';
import { AlertModalProps } from '@/components/modal/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
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
  const registerRequest = async (data: any, file?: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await instance.post('/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: { ...data },
      });

      setIsLoading(false);
      setIsShowModal(true);

      setModalProps({
        title: '회원가입 성공',
        message: '회원가입이 완료되었습니다.',
        onConfirm: () => {
          navigate('/login');
        },
      });

      return response;
    } catch (error) {
      setIsLoading(false);
      setIsShowModal(true);
      setModalProps({
        title: '회원가입 실패',
        message: '회원가입에 실패하였습니다.',
        onConfirm: () => {
          navigate('/signup');
        },
      });

      return console.error('Error Fetching data: ', error);
    }
  };

  return {
    registerRequest,
    isLoading,
    showModal,
    modalProps,
  };
}

export default useAuth;
