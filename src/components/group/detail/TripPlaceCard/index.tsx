import { Place } from '@/apis/groupDetail';

import { useRecoilState } from 'recoil';
import { mapOptionState } from '@/recoil/GroupRegistState';

import { metersToKilometers } from '@/utils/metersToKilometers';
import { getMarkerBackground } from '@/utils/getMarkerBackground';

import { AiFillCaretRight } from 'react-icons/ai';
import * as S from './TripPlaceCard.styles';
import { useCallback } from 'react';

interface TripPlaceCardProps extends Place {
  isLast?: boolean;
  onClickHandler?: () => void;
}
function TripPlaceCard({
  category,
  name,
  x,
  y,
  address,
  placeCode,
  orders,
  distance,
  isLast,
  onClickHandler,
}: TripPlaceCardProps) {
  const [mapOptions, setMapOptions] = useRecoilState(mapOptionState);

  // useCallback 함수로 반복되는 함수를 최적화
  const handleMapOption = useCallback(() => {
    setMapOptions({
      ...mapOptions,
      center: { lat: y, lng: x },
    });
  }, [y, x, setMapOptions]);

  const markerColor = getMarkerBackground(category || '기타');
  const kilometers = distance && metersToKilometers(distance);

  return (
    <div>
      <S.TripPlaceCardContainer onClick={handleMapOption}>
        <S.TripPlaceCardOrder style={{ backgroundColor: markerColor }}>
          {orders}
        </S.TripPlaceCardOrder>
        <S.TripPlaceCardInfo>
          <S.TripPlaceCardHeading>{name}</S.TripPlaceCardHeading>
          <S.TripPlaceCardDetailInfo>
            {category && (
              <S.TripPlaceCardCategory>
                {category}&nbsp;&#183;&nbsp;
              </S.TripPlaceCardCategory>
            )}
            <S.TripPlaceCardAddress>{address}</S.TripPlaceCardAddress>
          </S.TripPlaceCardDetailInfo>
        </S.TripPlaceCardInfo>
      </S.TripPlaceCardContainer>
      {!isLast && (
        <S.TripPlaceDistanceContainer>
          <div className="flex items-center w-[56px] justify-end">
            {distance != null && (
              <>
                <S.TripPlaceDistance>{kilometers}&nbsp;km</S.TripPlaceDistance>
                <AiFillCaretRight
                  style={{
                    fontSize: '12px',
                    marginLeft: '3px',
                    minWidth: '1em',
                  }}
                />
              </>
            )}
          </div>
          <S.TripPlaceDistanceLine />
        </S.TripPlaceDistanceContainer>
      )}
    </div>
  );
}

export default TripPlaceCard;
