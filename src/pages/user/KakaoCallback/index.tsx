import instance from '@/apis';
import { tokenRefreshRequest } from '@/apis/user';
import Loader from '@/components/common/Loader';

import { modalState } from '@/recoil/modalState';
import { loginState } from '@/recoil/userState';
import { setAccessToken, setUserInfo } from '@/utils/localStorage';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [modalDataState, setModalDataState] = useRecoilState(modalState);
  const setIsLogin = useSetRecoilState(loginState);

  const handleKakaoLogin = async () => {
    try {
      // 백엔드로 요청을 보내면, 백엔드에서 유저 정보와 jwt 토큰을 받아온다.
      const refreshToken = searchParams.get('refreshToken');

      const response = await instance.post(
        import.meta.env.VITE_SERVER_URL + '/auth/refresh',
        {
          refreshToken: refreshToken,
        }
      );

      setAccessToken(response.data.accessToken);
      setUserInfo(response.data.loginMemberIdDto);
      setIsLogin(true);

      navigate('/');
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
