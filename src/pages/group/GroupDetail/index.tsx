import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useGroupDetailDataFetching } from '@/hooks/useGroup';

import GroupTitle from '@/components/group/detail/GroupTitle';
import GroupMemberStatus from '@/components/group/detail/GroupMemberStatus';
import Loader from '@/components/Loader';
import TripTitle from '@/components/group/detail/TripTitle';
import TripPlaceList from '@/components/group/detail/TripPlaceList';

import * as S from './GroupDetail.styles';
import ApplyButton from '@/components/group/detail/ApplyButton';
import KakaoMap from '@/components/group/recruit/KakaoMap';

import { checkApplicationStatus } from '@/utils/checkApplicationStatus';
import { useRecoilState } from 'recoil';
import { mapOptionState, selectedPlaceState } from '@/recoil/GroupRegistState';

function GroupDetail() {
  const { groupId } = useParams();

  const userInfoString = localStorage.getItem('userInfo');
  const [userStatus, setUserStatus] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isDetailError, setIsDetailError] = useState<boolean>(false);

  const { data, isLoading, isError } = useGroupDetailDataFetching(
    Number(groupId)
  );

  useEffect(() => {
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      const memberEmail = userInfo.memberEmail;

      if (data) {
        setUserStatus(checkApplicationStatus(data, memberEmail));
        setSelectedPlace({ selectedPlace: data.places });
        setIsDetail(true);
      }
    }
  }, [userInfoString, data, setSelectedPlace]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <div>Error...</div>}
      {data && (
        <S.GroupDetailContainer>
          <GroupTitle title={data.tripGroupDetail.name} />

          {/* 카카오 지도  */}
          <div className="w-full h-[500px] mt-6">
            <KakaoMap isDetail={isDetail} isError={isError} />
          </div>

          {/* 그룹 멤버 정보 & 지원 정보  */}
          <S.GroupContentContainer>
            <div className="flex flex-col gap-3">
              <GroupMemberStatus
                currentUserNumber={data.tripGroupDetail.currentUserNumber}
                maxUserNumber={data.tripGroupDetail.maxUserNumber}
                dueDate={data.tripGroupDetail.dueDate}
                profileUrl={data.tripGroupDetail.profileUrl}
                nickName={data.tripGroupDetail.nickName}
                age={data.tripGroupDetail.age}
                gender={data.tripGroupDetail.gender}
                groupMembers={data.groupMembers}
              />
              <ApplyButton groupId={Number(groupId)} userStatus={userStatus} />
            </div>

            {/* 그룹 내용  */}
            <div>
              <TripTitle
                tripDate={data.tripGroupDetail.tripDate}
                tripArea={data.tripGroupDetail.tripArea}
              />
              {data.tripGroupDetail.content && (
                <S.GroupContent>{data.tripGroupDetail.content}</S.GroupContent>
              )}
              <TripPlaceList places={data.places} />
            </div>
          </S.GroupContentContainer>
        </S.GroupDetailContainer>
      )}
    </>
  );
}

export default GroupDetail;
