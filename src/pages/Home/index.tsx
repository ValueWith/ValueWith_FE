import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { paramsState } from '@/recoil/paramsState';

import HomeTripList from '@/components/HomeTripList';

import * as S from './Home.styles';

function Home() {
  const navigate = useNavigate();
  const setParams = useSetRecoilState(paramsState);

  const handleGroup = () => {
    setParams({
      page: '1',
      status: 'all',
      area: 'all',
      sort: 'latest',
      title: '',
    });
  };

  return (
    <S.HomeMainContainer>
      <S.Banner />
      <S.TitleContainer>
        <S.Title>카테고리 이름</S.Title>
        <S.Link
          onClick={() => {
            navigate('/group');
            handleGroup();
          }}
        >
          더 많은 일정 확인하기 &gt;
        </S.Link>
      </S.TitleContainer>
      <HomeTripList />
    </S.HomeMainContainer>
  );
}

export default Home;
