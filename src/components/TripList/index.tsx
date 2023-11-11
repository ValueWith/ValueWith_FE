import { Link } from 'react-router-dom';

import { TripGroup } from '@/apis/group';
import TripCard from '../TripCard';

import * as S from './TripList.styles';

interface TripListProps {
  groupData: TripGroup[];
}

function groupPageLink(groupId: number) {
  const currentPath = window.location.pathname;

  if (currentPath === '/group') {
    return `${groupId}`;
  }

  return `group/${groupId}`;
}

function TripList({ groupData }: TripListProps) {
  return (
    <S.TripListContainer>
      {groupData &&
        groupData.map((group: TripGroup) => (
          <Link to={groupPageLink(group.tripGroupId)} key={group.tripGroupId}>
            <TripCard key={group.tripGroupId} group={group} />
          </Link>
        ))}
    </S.TripListContainer>
  );
}

export default TripList;
