import * as S from './TripCard.styles';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdCalendarMonth } from 'react-icons/md';
import { GroupProps } from '../TripList';
import { calculateDday } from '@/utils/dateUrils';

interface TripCardProps {
  group: GroupProps;
}

function TripCard({ group }: TripCardProps) {
  const {
    name,
    content,
    max_user_number,
    cur_user_number,
    trip_area,
    trip_date,
    due_date,
    thumbnail_url,
    status,
  } = group;
  const d_day = calculateDday(due_date);
  const isClosed = status !== 'open';
  return (
    <S.TripCardContainer>
      {isClosed && <S.Closed />}
      <S.CardTumbnail src={thumbnail_url} alt='지도 썸네일' />
      <S.IconContainer>
        <S.Icon>
          <FaMapMarkerAlt />
          <span>{trip_area}</span>
        </S.Icon>
        <S.Icon>
          <MdCalendarMonth />
          <span>{trip_date}</span>
        </S.Icon>
      </S.IconContainer>
      <S.ContentContainer>
        <S.Title>{name}</S.Title>
        <S.Detail>
          <S.DetailTitle>모집현황</S.DetailTitle>
          <S.DetailContent>
            {cur_user_number}명 / {max_user_number}명
          </S.DetailContent>
        </S.Detail>
        <S.Detail>
          <S.DetailTitle>모집마감</S.DetailTitle>
          <S.DetailContent>
            {due_date} ({d_day})
          </S.DetailContent>
        </S.Detail>
        <S.Content>{content}</S.Content>
        <S.ProfileContainer>
          <S.ProfileImage src='/public/images/cat.jpg' alt='프로필 이미지' />
          <span>유진 &bull; 20대 &bull; 여성</span>
        </S.ProfileContainer>
      </S.ContentContainer>
    </S.TripCardContainer>
  );
}

export default TripCard;
