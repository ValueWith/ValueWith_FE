import TripPlaceCard from '../TripPlaceCard';
import { Place } from '@/apis/group';

import * as S from './TripPlaceList.styles';

interface TripPlaceListProps {
  places: Place[];
}

function TripPlaceList({ places }: TripPlaceListProps) {
  return (
    <S.TripPlaceListContainer>
      {places &&
        places.map((place: Place, index: number) => (
          <TripPlaceCard
            key={place.orders}
            category={place.category}
            name={place.name}
            x={place.x}
            y={place.y}
            address={place.address}
            placeCode={place.placeCode}
            orders={place.orders}
            distance={place.distance}
            isLast={index === places.length - 1}
          />
        ))}
    </S.TripPlaceListContainer>
  );
}

export default TripPlaceList;
