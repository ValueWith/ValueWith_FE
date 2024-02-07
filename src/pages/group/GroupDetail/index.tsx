import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { mapOptionState, selectedPlaceState } from '@/recoil/GroupRegistState';
import { loginState } from '@/recoil/userState';

import { useGroupDetailDataFetching } from '@/hooks/useGroup';
import { getUserInfo } from '@/utils/localStorage';
import { checkApplicationStatus } from '@/utils/checkApplicationStatus';

import GroupTitle from '@/components/group/detail/GroupTitle';
import GroupMemberStatus from '@/components/group/detail/GroupMemberStatus';
import Loader from '@/components/common/Loader';
import TripTitle from '@/components/group/detail/TripTitle';
import TripPlaceList from '@/components/group/detail/TripPlaceList';
import ApplyButton from '@/components/group/detail/ApplyButton';
import KakaoMap from '@/components/group/recruit/KakaoMap';

import * as S from './GroupDetail.styles';

function GroupDetail() {
  const { groupId } = useParams();

  const [userStatus, setUserStatus] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isDetailError, setIsDetailError] = useState<boolean>(false);

  const isLogin = useRecoilValue(loginState);
  const userInfo = getUserInfo();

  const { data, isLoading, isError } = useGroupDetailDataFetching(
    Number(groupId)
  );

  useEffect(() => {
    const handleData = () => {
      if (data) {
        setSelectedPlace({ selectedPlace: data.places });
        setIsDetail(true);

        if (isLogin) {
          const memberEmail = userInfo.memberEmail;
          const status = checkApplicationStatus(data, memberEmail);
          setUserStatus(status);
        }
      } else {
        setIsDetailError(true);
      }
    };

    handleData();
  }, [data, setSelectedPlace]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <div>Error...</div>}
      {data && userInfo && (
        <S.GroupDetailContainer>
          <GroupTitle title={data.tripGroupDetail.name} />

          {/* 카카오 지도  */}
          <div className='w-full h-[500px] mt-6'>
            <KakaoMap isDetail={isDetail} isError={isDetailError} />
          </div>

          {/* 그룹 멤버 정보 & 지원 정보  */}
          <S.GroupContentContainer>
            <div className='flex flex-col gap-3 relative'>
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
              <ApplyButton
                tripGroupId={Number(groupId)}
                userStatus={userStatus}
              />
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
