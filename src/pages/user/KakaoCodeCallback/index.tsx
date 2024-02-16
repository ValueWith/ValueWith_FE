import Loader from '@/components/common/Loader';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoCodeCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/oauth2/kakao');
  }, []);

  return (
    <div>
      <Loader />
    </div>
  );
}

export default KakaoCodeCallback;
