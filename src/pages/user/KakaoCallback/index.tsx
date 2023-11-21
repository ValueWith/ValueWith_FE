import instance from '@/apis';
import Loader from '@/components/Loader';
import { modalState } from '@/recoil/modalState';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

function KakaoCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const grantType = 'authorization_code';
  const code = new URLSearchParams(location.search).get('code');

  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const handleKakaoLogin = async () => {
    try {
      // 카카오로 code를 받아온 후, 해당 code를 이용해 인가 코드를 받아온다.
      const response = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${
          import.meta.env.VITE_KAKAO_API_KEY
        }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&code=${code}`,
        null,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      // 백엔드로 카카오로부터 받은 인가 코드를 보내고, 백엔드로부터 유저 정보와 jwt 토큰을 받아온다.
      const getUserData = await instance.post(``);

      // 받아온 유저 정보를 localStorage에 저장한다.
      // localStorage.setItem('accessToken', getUserData.accessToken);
      // localStorage.setItem('userInfo', getUserData.userInfo);

      // 저장하고 나서 메인 페이지로 이동한다.
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
