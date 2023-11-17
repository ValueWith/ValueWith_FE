import { useEffect, useState } from 'react';
import { TripGroup } from '@/apis/group';
import TripCard from '@/components/TripCard';
import useGroupDataFetching from '@/hooks/useGroup';
import { paramsState } from '@/recoil/paramsState';
import { useRecoilState } from 'recoil';

import { findValueByProperty } from '@/utils/findCodeByLabel';

import * as S from './GroupManagement.styles';
import { getGroupList, useMyLoungeData } from '@/apis/mylounge';
import Loader from '@/components/Loader';

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
  const [params, setParams] = useRecoilState(paramsState);

  const [loungeTab, setLoungeTab] = useState(GROUP_MANAGEMENT_TABS[0].type);

  const handleLoungeTab = ({ type }: { type: string }) => {
    setLoungeTab(type);
  };

  const {
    data: loungeData,
    isLoading,
    isError,
  } = useMyLoungeData({
    status: loungeTab,
  });

  useEffect(() => {
    setParams({
      ...params,
      status: loungeTab,
    });
  }, [loungeTab]);

  useEffect(() => {
    console.log(loungeData?.data, 'data'); // currentpage, totalpages, totalElements tripGroups
  }, [loungeTab]);

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
          </>
        ) : (
          <Loader />
        )}
      </S.GroupManagementContent>
    </S.GroupManagementContainer>
  );
}

export default GroupManagement;
