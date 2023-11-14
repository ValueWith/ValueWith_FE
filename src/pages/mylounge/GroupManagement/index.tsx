import { useEffect, useState } from 'react';
import { TripGroup } from '@/apis/group';
import TripCard from '@/components/TripCard';
import useGroupDataFetching from '@/hooks/useGroup';
import { paramsState } from '@/recoil/paramsState';
import { useRecoilState } from 'recoil';

import { findValueByProperty } from '@/utils/findCodeByLabel';

import * as S from './GroupManagement.styles';

const GROUP_MANAGEMENT_TABS = [
  {
    label: '내가 만든 그룹',
    type: 'management',
  },
  {
    label: '참여중인 그룹',
    type: 'registration',
  },
  {
    label: '대기중인 그룹',
    type: 'waiting',
  },
];

function GroupManagement() {
  const [params, setParams] = useRecoilState(paramsState);
  const { data, isLoading, isError } = useGroupDataFetching(params);

  const [loungeTab, setLoungeTab] = useState(GROUP_MANAGEMENT_TABS[0].type);

  const handleLoungeTab = ({ type }: { type: string }) => {
    setLoungeTab(type);

    // TODO : 내가 만든 그룹 , 참여중인 그룹, 대기중인 그룹 호출 GET으로 수정
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
        {/* TODO : 현재 라운지 타입에 따라 데이터를 렌더링 */}
        {data &&
          data.tripGroups.map((group: TripGroup) => (
            <TripCard
              key={group.tripGroupId}
              group={group}
              cardType={loungeTab}
            />
          ))}
      </S.GroupManagementContent>
    </S.GroupManagementContainer>
  );
}

export default GroupManagement;
