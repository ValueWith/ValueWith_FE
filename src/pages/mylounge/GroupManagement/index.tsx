import { useEffect, useState } from 'react';

import { paramsState } from '@/recoil/paramsState';
import { useRecoilState } from 'recoil';

import { TripGroup } from '@/apis/group';

import { useMyLoungeData } from '@/hooks/useLounge';

import TripCard from '@/components/TripCard';
import Loader from '@/components/Loader';
import Pagenation from '@/components/Pagination';

import * as S from './GroupManagement.styles';

const GROUP_MANAGEMENT_TABS = [
  {
    label: '내가 만든 그룹',
    type: 'leader',
  },
  {
    label: '참여중인 그룹',
    type: 'approved',
  },
  {
    label: '대기중인 그룹',
    type: 'pending',
  },
];

function GroupManagement() {
  const [page, setPage] = useState<number>(1);
  const [loungeTab, setLoungeTab] = useState(GROUP_MANAGEMENT_TABS[0].type);

  const {
    data: loungeData,
    isLoading,
    isError,
  } = useMyLoungeData({
    status: loungeTab,
    page: page,
  });

  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected + 1);
  };

  const handleLoungeTab = ({ type }: { type: string }) => {
    setLoungeTab(type);
  };

  return (
    <S.GroupManagementContainer>
      <S.GroupManagementHeader>
        {GROUP_MANAGEMENT_TABS.map((tab, index) => (
          <S.GroupManagementHeading
            key={index}
            className={loungeTab === tab.type ? 'active' : ''}
            onClick={() => handleLoungeTab(tab)}
          >
            {tab.label}
          </S.GroupManagementHeading>
        ))}
      </S.GroupManagementHeader>

      <S.GroupManagementContent>
        {loungeData ? (
          <>
            {loungeData.data.tripGroups.map((group: TripGroup) => (
              <TripCard
                key={group.tripGroupId}
                group={group}
                cardType={loungeTab}
              />
            ))}
            <Pagenation
              page={page}
              pageCount={loungeData.data.totalPages}
              handlePageClick={handlePageClick}
            />
          </>
        ) : (
          <Loader />
        )}
      </S.GroupManagementContent>
    </S.GroupManagementContainer>
  );
}

export default GroupManagement;
