import { useNavigate } from 'react-router-dom';

import HomeTripList from '@/components/HomeTripList';

import * as S from './Home.styles';

function Home() {
  const navigate = useNavigate();

  return (
    <S.HomeMainContainer>
      <S.Banner>
        <img
          src="https://d1udi89ozp4mef.cloudfront.net/location%2F89617668-8754-4c3b-b8ac-814a414f624e-123.png"
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
