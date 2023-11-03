import { GroupListItem, TripGroup } from '@/apis/group';
import TripCard from '../TripCard';
import * as S from './TripList.styles';

interface TripListProps {
  groupData: GroupListItem;
}

function TripList({ groupData }: TripListProps) {
  // TODO: 페이지네이션 기능 추가

  return (
    <S.TripListContainer>
      {groupData &&
        groupData.tripGroups.map((group: TripGroup) => (
          <TripCard key={group.tripGroupId} group={group} />
        ))}
    </S.TripListContainer>
  );
}

export default TripList;
