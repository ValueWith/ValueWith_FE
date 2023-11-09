import { TripGroup } from '@/apis/group';
import TripCard from '../TripCard';
import * as S from './TripList.styles';

interface TripListProps {
  groupData: TripGroup[];
}

function TripList({ groupData }: TripListProps) {
  return (
    <S.TripListContainer>
      {groupData &&
        groupData.map((group: TripGroup) => (
          <TripCard key={group.tripGroupId} group={group} />
        ))}
    </S.TripListContainer>
  );
}

export default TripList;
