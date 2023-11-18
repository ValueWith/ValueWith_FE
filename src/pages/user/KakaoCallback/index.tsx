import Loader from '@/components/Loader';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function KakaoCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const grantType = 'authorization_code';
  const code = new URLSearchParams(location.search).get('code');

  const handleKakaoLogin = async () => {
    try {
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

      console.log(response);
    } catch (error) {
      console.log(error);
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
