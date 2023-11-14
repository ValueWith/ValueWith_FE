import { Place } from '@/apis/groupDetail';
import { getMarkerBackground } from '@/utils/getMarkerBackground';

import { AiFillCaretRight } from 'react-icons/ai';
import * as S from './TripPlaceCard.styles';

function TripPlaceCard({
  category,
  name,
  x,
  y,
  address,
  placeCode,
  orders,
  distance,
}: Place) {
  const markerColor = getMarkerBackground(category);
  return (
    <div>
      <S.TripPlaceCardContainer>
        <S.TripPlaceCardOrder style={{ backgroundColor: markerColor }}>
          {orders}
        </S.TripPlaceCardOrder>
        <S.TripPlaceCardInfo>
          <S.TripPlaceCardHeading>{name}</S.TripPlaceCardHeading>
          <S.TripPlaceCardDetailInfo>
            <S.TripPlaceCardCategory>
              {category}&nbsp;&#183;&nbsp;
            </S.TripPlaceCardCategory>
            <S.TripPlaceCardAddress>{address}</S.TripPlaceCardAddress>
          </S.TripPlaceCardDetailInfo>
        </S.TripPlaceCardInfo>
      </S.TripPlaceCardContainer>
      {distance !== 0 && (
        <S.TripPlaceDistanceContainer>
          <div className='flex items-center w-[56px] justify-end'>
            <S.TripPlaceDistance>{distance}km</S.TripPlaceDistance>
            <AiFillCaretRight style={{ fontSize: '12px', marginLeft: '3px' }} />
          </div>
          <S.TripPlaceDistanceLine />
        </S.TripPlaceDistanceContainer>
      )}
    </div>
  );
}

export default TripPlaceCard;
