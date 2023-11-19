import { AlarmData } from '@/apis/alarm';
import { formatAlarmDate } from '@/utils/dateUtil';

import { AiOutlineClose } from 'react-icons/ai';
import * as S from './AlarmCard.styles';

interface AlarmCardProps {
  data: AlarmData;
}

function AlarmCard({ data }: AlarmCardProps) {
  const createdDate = formatAlarmDate(data.createdDateTime);

  return (
    <S.AlarmCardContainer>
      <S.AlarmCardContentContainer>
        <S.AlarmCardContent>
          <S.AlarmCardGroupName>{data.groupName}</S.AlarmCardGroupName>
          {data.content.content}
        </S.AlarmCardContent>
        <S.AlarmCardDate>{createdDate}</S.AlarmCardDate>
      </S.AlarmCardContentContainer>
      <button className='cursor-pointer'>
        <AiOutlineClose size={13} style={{ color: '#878787' }} />
      </button>
    </S.AlarmCardContainer>
  );
}

export default AlarmCard;
