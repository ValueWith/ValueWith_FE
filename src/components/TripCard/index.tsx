import * as S from './TripCard.styles';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';
import { calculateDday } from '@/utils/dateUtil.ts';
import { TripGroup } from '@/apis/group';
import { conversionArea } from '@/utils/conversionArea';
import GroupUserInfo from '../GroupUserInfo';

interface TripCardProps {
  group: TripGroup;
}

// "tripGroupId": 3,
// "name": "한복입고 서울여행",
// "content": "Group Content 3",
// "maxUserNumber": 10,
// "currentUserNumber": 1,
// "tripArea": "seoul",
// "tripDate": "2023-12-03",
// "dueDate": "2023-11-04",
// "createdAt": "2023-11-03",
// "status": "마감",
// "thumbnailUrl": "https://d1udi89ozp4mef.cloudfront.net/location%2Fb6280182-8d6d-4057-a5ae-850cf738b48f-seoul1.jpeg",
// "profileUrl": "https://d1udi89ozp4mef.cloudfront.net/location%2F6480bf6a-57df-4395-9970-5979d327b5f2-dev_loopy.png",
// "nickName": "nickname1",
// "age": "25",
// "gender": "남"

function TripCard({ group }: TripCardProps) {
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
  const d_day = calculateDday(dueDate);
  const isClosed = status !== '모집중';
  const koreanArea = conversionArea(tripArea);

  return (
    <S.TripCardContainer>
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
        <GroupUserInfo
          profileUrl={profileUrl}
          nickName={nickName}
          age={age}
          gender={gender}
        />
      </S.ContentContainer>
    </S.TripCardContainer>
  );
}

export default TripCard;
