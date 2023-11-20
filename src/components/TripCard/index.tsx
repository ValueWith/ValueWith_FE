import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupUserInfo from '../GroupUserInfo';
import GroupMemberManagement from '../GroupMemberManagement';
import TripCardUserInfo from '../TripCardUserInfo';

import { TripGroup } from '@/apis/group';
import { calculateDday } from '@/utils/dateUtil.ts';
import { conversionArea } from '@/utils/conversionArea';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';

import * as S from './TripCard.styles';
import theme from '@/assets/styles/theme';

interface TripCardProps {
  group: TripGroup;
  cardType?: string; // 'management' | 'registration' | 'waiting';
}

function TripCard({ group, cardType }: TripCardProps) {
  const {
    name,
    content,
    maxUserNumber,
    currentUserNumber,
    tripArea,
    tripDate,
    dueDate,
    thumbnailUrl,
    status,
    profileUrl,
    nickName,
    age,
    gender,
    tripGroupId,
  } = group;

  const navigate = useNavigate();
  const [applyList, setApplyList] = useState([]);
  const [isOpenApplyList, setIsOpenApplyList] = useState({
    isOpen: false,
    type: 'approved',
  });

  const d_day = calculateDday(dueDate);
  const isClosed = status !== '모집중';
  const koreanArea = conversionArea(tripArea);

  const redirectToTripDetail = () => {
    navigate(`/group/${tripGroupId}`);
  };

  useEffect(() => {
    if (!isOpenApplyList.isOpen) return;
  }, [isOpenApplyList]);

  return (
    <>
      <S.TripCardContainer className={cardType && 'mylounge'}>
        {isClosed && <S.Closed />}
        <S.CardTumbnail
          src={thumbnailUrl}
          alt="지도 썸네일"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={cardType ? redirectToTripDetail : () => {}}
        />
        <S.IconContainer>
          <S.Icon>
            <FaMapMarkerAlt />
            <span>{koreanArea}</span>
          </S.Icon>
          <S.Icon>
            <MdCalendarMonth />
            <span>{tripDate}</span>
          </S.Icon>
        </S.IconContainer>
        <S.ContentContainer>
          <S.Title>{name}</S.Title>
          <S.Detail>
            <S.DetailTitle>모집현황</S.DetailTitle>
            <S.DetailContent>
              {currentUserNumber}명 / {maxUserNumber}명
            </S.DetailContent>
          </S.Detail>
          <S.Detail>
            <S.DetailTitle>모집마감</S.DetailTitle>
            <S.DetailContent>
              {dueDate} ({d_day})
            </S.DetailContent>
          </S.Detail>
          <S.Content>{content}</S.Content>

          {/* 마이라운지에서 '내 그룹' 에서는 UserInfo 대신 관리 버튼 노출   */}
          {cardType === 'leader' ? (
            <GroupMemberManagement
              cardType={cardType}
              tripGroupId={group.tripGroupId}
              onSetApplyList={setApplyList}
              isOpenApplyList={isOpenApplyList}
              setIsOpenApplyList={setIsOpenApplyList}
            />
          ) : (
            <>
              {cardType === 'approved' || cardType === 'pending' ? (
                <>
                  <TripCardUserInfo
                    profileUrl={profileUrl}
                    nickName={nickName}
                    age={age}
                    gender={gender}
                  />
                  <div className="w-full h-[1px] bg-gray-100 my-5"></div>
                  <GroupMemberManagement
                    cardType={cardType}
                    tripGroupId={group.tripGroupId}
                    onSetApplyList={setApplyList}
                    isOpenApplyList={isOpenApplyList}
                    setIsOpenApplyList={setIsOpenApplyList}
                  />
                </>
              ) : (
                <>
                  <TripCardUserInfo
                    profileUrl={profileUrl}
                    nickName={nickName}
                    age={age}
                    gender={gender}
                  />
                </>
              )}
            </>
          )}
        </S.ContentContainer>
      </S.TripCardContainer>

      {/* 지원자 목록 보기 버튼 클릭 시 */}
      {isOpenApplyList.isOpen && cardType === 'leader' && (
        <S.ApplyListContainer>
          <S.ApplyListTitle>
            {isOpenApplyList.type === 'approved' ? '멤버 관리' : '지원자 목록'}
          </S.ApplyListTitle>
          <S.MemberListContainer className="relative">
            {applyList && (
              <>
                {applyList.length > 0 ? (
                  applyList.map((member: any, index: number) => (
                    <GroupUserInfo
                      key={index}
                      tripGroupId={tripGroupId}
                      groupMemberId={member.groupMemberId}
                      type={isOpenApplyList.type}
                      profileUrl={member.groupMemberProfileUrl}
                      nickName={member.groupMemberNickname}
                      age={member.groupMemberAge}
                      gender={member.groupMemberGender}
                    />
                  ))
                ) : (
                  <p
                    className="mt-1 text-[14px]"
                    style={{
                      color: `${theme.color.gray400}`,
                    }}
                  >
                    {isOpenApplyList.type === 'approved'
                      ? `그룹 ${name} 의 멤버가 없습니다`
                      : `그룹 ${name} 의 지원자가 없습니다`}
                  </p>
                )}
              </>
            )}

            {!applyList && <p>데이터를 로딩 중입니다...</p>}
          </S.MemberListContainer>
        </S.ApplyListContainer>
      )}
    </>
  );
}

export default TripCard;
