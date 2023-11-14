import { conversionArea } from '@/utils/conversionArea';
import { formatKoreanDate } from '@/utils/dateUtil';

import * as S from './TripTitle.styles';

interface TripTitleProps {
  tripDate: string;
  tripArea: string;
}

function TripTitle({ tripDate, tripArea }: TripTitleProps) {
  const koreanArea = conversionArea(tripArea);
  const date = formatKoreanDate(tripDate);

  return (
    <div className='mb-[11px]'>
      <S.TripDate>{date}, </S.TripDate>
      <S.TripLocation>{koreanArea}</S.TripLocation>
      <S.TripDate>에서</S.TripDate>
    </div>
  );
}

export default TripTitle;
