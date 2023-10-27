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

function TripList() {
  const { data: groupData, isLoading, isError } = useGroupDataFetching();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error Fetching Data</div>;
  }

  return (
    <S.TripListContainer>
      {groupData &&
        groupData.map((group: GroupProps) => (
          <TripCard key={group.id} group={group} />
        ))}
    </S.TripListContainer>
  );
}

export default TripList;
