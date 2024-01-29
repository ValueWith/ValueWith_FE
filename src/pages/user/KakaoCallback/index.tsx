import instance from '@/apis';
import { tokenRefreshRequest } from '@/apis/user';
import Loader from '@/components/common/Loader';

import { modalState } from '@/recoil/modalState';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

function KakaoCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const handleKakaoLogin = async () => {
    try {
      // 백엔드로 요청을 보내면, 백엔드에서 카카오로부터 받은 인가 코드를 이용해 유저 정보와 jwt 토큰을 받아온다.
      const response = await tokenRefreshRequest();
      const data = response.data; // 응답 데이터
      document.cookie = `RefreshToken=${data.refreshToken}; path=/;`;

      alert('로그인 성공: ' + data);
    } catch (error) {
      setModalDataState({
        isModalOpen: true,
        title: '로그인 실패',
        message: '로그인에 실패하였습니다. 다시 시도해주세요.',
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });
          navigate('/login');
        },
      });
    }
  };

  useEffect(() => {
    handleKakaoLogin();
  }, []);

  return (
    <div>
      <Loader />
    </div>
  );
}

export default KakaoCallback;
