import TripPlaceCard from '../TripPlaceCard';
import { Place } from '@/apis/groupDetail';

import * as S from './TripPlaceList.styles';

interface TripPlaceListProps {
  places: Place[];
}

function TripPlaceList({ places }: TripPlaceListProps) {
  return (
    <S.TripPlaceListContainer>
      {places &&
        places.map((place: Place) => (
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
          />
        ))}
    </S.TripPlaceListContainer>
  );
}

export default TripPlaceList;
