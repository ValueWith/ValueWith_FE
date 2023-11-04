import { useNavigate } from 'react-router-dom';

import TripList from '@/components/TripList';

import * as S from './Home.styles';
import useGroupDataFetching from '@/hooks/useGroup';
import { GroupListParams } from '@/apis/group';

function Home() {
  const navigate = useNavigate();

  const params: GroupListParams = {
    page: 1,
    status: 'open',
    area: 'all',
    sorting: 'latest',
    title: '',
  };

  const { data: groupData, isLoading, isError } = useGroupDataFetching(params);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <S.HomeMainContainer>
      <S.Banner />
      <S.TitleContainer>
        <S.Title>카테고리 이름</S.Title>
        <S.Link onClick={() => navigate('/group')}>
          더 많은 일정 확인하기 &gt;
        </S.Link>
      </S.TitleContainer>
      {groupData ? <TripList groupData={groupData} /> : <div>No data...</div>}
    </S.HomeMainContainer>
  );
}

export default Home;
