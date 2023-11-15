import { useEffect, useState } from 'react';
import GroupUserInfo from '../GroupUserInfo';
import GroupMemberManagement from '../GroupMemberManagement';
import TripCardUserInfo from '../TripCardUserInfo';

import { TripGroup } from '@/apis/group';
import { calculateDday } from '@/utils/dateUtil.ts';
import { conversionArea } from '@/utils/conversionArea';

import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';

import * as S from './TripCard.styles';

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
  } = group;

  const [isOpenApplyList, setIsOpenApplyList] = useState({
    isOpen: false,
    type: '',
  });

  const d_day = calculateDday(dueDate);
  const isClosed = status !== '모집중';
  const koreanArea = conversionArea(tripArea);

  useEffect(() => {
    if (!isOpenApplyList.isOpen) return;
  }, [isOpenApplyList]);

  return (
    <>
      <S.TripCardContainer
        className={cardType && 'mylounge'}
        onClick={() => {
          console.log('클릭');
        }}
      >
        {isClosed && <S.Closed />}
        <S.CardTumbnail src={thumbnailUrl} alt='지도 썸네일' />
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
          {cardType === 'management' ? (
            <GroupMemberManagement
              isOpenApplyList={isOpenApplyList}
              setIsOpenApplyList={setIsOpenApplyList}
            />
          ) : (
            <TripCardUserInfo
              profileUrl={profileUrl}
              nickName={nickName}
              age={age}
              gender={gender}
            />
          )}
        </S.ContentContainer>
      </S.TripCardContainer>

      {/* 지원자 목록 보기 버튼 클릭 시 */}
      {isOpenApplyList.isOpen && (
        <S.ApplyListContainer>
          <S.ApplyListTitle>지원자 목록</S.ApplyListTitle>
          <S.MemberListContainer>
            <GroupUserInfo
              profileUrl={profileUrl}
              nickName={nickName}
              age={age}
              gender={gender}
            />
          </S.MemberListContainer>
        </S.ApplyListContainer>
      )}
    </>
  );
}

export default TripCard;
