import useGroupDataFetching from '@/hooks/useGroup';
import TripCard from '../TripCard';
import * as S from './TripList.styles';

export interface GroupProps {
  id: string;
  name: string;
  content: string;
  max_user_number: number;
  cur_user_number: number;
  trip_area: string;
  trip_date: string;
  due_date: string;
  thumbnail_url: string;
  status: string;
}

function TripList({ pageName }: { pageName: string }) {
  const { data: groupData, isLoading, isError } = useGroupDataFetching();

  if (isLoading) {
    // TODO: Loader 또는 Skeleton 고려할 것
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error Fetching Data</div>;
  }

  // Home 페이지에서는 status가 'close'인 그룹을 제외하고 최대 8개까지 렌더링
  // eslint-disable-next-line prefer-const
  let filteredGroups: GroupProps[] = groupData
    .filter((group: GroupProps) => group.status !== 'close')
    .slice(0, 8);

  // Group 페이지에서는 모든 그룹 데이터 렌더링
  // TODO: 페이지네이션 기능 추가
  if (pageName !== 'Home') {
    filteredGroups = groupData;
  }

  return (
    <S.TripListContainer>
      {filteredGroups &&
        filteredGroups.map((group: GroupProps) => (
          <TripCard key={group.id} group={group} />
        ))}
    </S.TripListContainer>
  );
}

export default TripList;
