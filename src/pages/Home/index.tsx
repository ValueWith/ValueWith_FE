import { useNavigate } from 'react-router-dom';

import HomeTripList from '@/components/HomeTripList';

import * as S from './Home.styles';

function Home() {
  const navigate = useNavigate();

  return (
    <S.HomeMainContainer>
      <S.Banner>
        <img
          src="https://github.com/ValueWith/ValueWith_FE/assets/110911811/ec0727a0-28d4-43cc-9f1f-d09c000e45a1"
          alt="배너 이미지"
        />
      </S.Banner>
      <S.TitleContainer>
        <S.Title>카테고리 이름</S.Title>
        <S.Link onClick={() => navigate('/group')}>
          더 많은 일정 확인하기 &gt;
        </S.Link>
      </S.TitleContainer>
      <HomeTripList />
    </S.HomeMainContainer>
  );
}

export default Home;
