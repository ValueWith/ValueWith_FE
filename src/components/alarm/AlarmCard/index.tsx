import { AlarmData, deleteAlarm, readAlarm } from '@/apis/alarm';
import { formatAlarmDate } from '@/utils/dateUtil';

import { AiOutlineClose } from 'react-icons/ai';
import * as S from './AlarmCard.styles';
import { useQueryClient } from 'react-query';

interface AlarmCardProps {
  data: AlarmData;
}

function AlarmCard({ data }: AlarmCardProps) {
  const queryClient = useQueryClient();
  const createdDate = formatAlarmDate(data.createdDateTime);

  const handleDelete = async () => {
    await deleteAlarm(data.alertId);
    queryClient.invalidateQueries(['alarmData']);
  };

  const handleRead = async () => {
    await readAlarm(data.alertId);
    queryClient.invalidateQueries(['alarmData']);
  };

  return (
    <S.AlarmCardContainer onClick={handleRead}>
      <S.AlarmCardContentContainer>
        <S.AlarmCardContent>
          <S.AlarmCardGroupName>{data.groupName}</S.AlarmCardGroupName>
          {data.content.content}
        </S.AlarmCardContent>
        <S.AlarmCardDate>{createdDate}</S.AlarmCardDate>
      </S.AlarmCardContentContainer>
      <button className='cursor-pointer' onClick={handleDelete}>
        <AiOutlineClose size={13} style={{ color: '#878787' }} />
      </button>
    </S.AlarmCardContainer>
  );
}

export default AlarmCard;
