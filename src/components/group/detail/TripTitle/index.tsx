import { conversionArea } from '@/utils/conversionArea';
import { formatKoreanDate } from '@/utils/dateUtil';

import { TbLink } from 'react-icons/tb';
import * as S from './TripTitle.styles';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface TripTitleProps {
  tripDate: string;
  tripArea: string;
}

function TripTitle({ tripDate, tripArea }: TripTitleProps) {
  const koreanArea = conversionArea(tripArea);
  const date = formatKoreanDate(tripDate);

  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}${location.search}`;

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('클립보드 복사 실패: ', err);
    }
  };

  return (
    <div className='mb-[11px] flex justify-between relative'>
      <div>
        <S.TripDate>{date}, </S.TripDate>
        <S.TripLocation>{koreanArea}</S.TripLocation>
        <S.TripDate>에서</S.TripDate>
      </div>
      <S.ClipBoard onClick={handleCopyLink}>
        <TbLink style={{ width: '20px', height: '20px', color: '#6c6c6c' }} />
      </S.ClipBoard>
      {isCopied && (
        <S.ClipBoardSuccess>클립보드에 저장되었습니다.</S.ClipBoardSuccess>
      )}
    </div>
  );
}

export default TripTitle;
