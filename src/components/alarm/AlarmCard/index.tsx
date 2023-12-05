import { useQueryClient } from 'react-query';

import { AlarmContent, deleteAlarm, readAlarm } from '@/apis/alarm';
import { formatAlarmDate } from '@/utils/dateUtil';

import { AiOutlineClose } from 'react-icons/ai';
import * as S from './AlarmCard.styles';

interface AlarmCardProps {
  data: AlarmContent;
  page: number;
}

function AlarmCard({ data, page }: AlarmCardProps) {
  const queryClient = useQueryClient();
  const createdDate = formatAlarmDate(data.createdDateTime);

  const handleDelete = async () => {
    await deleteAlarm(data.alertId);
    queryClient.invalidateQueries(['alarmData', page]);
  };

  const handleRead = async () => {
    await readAlarm(data.alertId);
    queryClient.invalidateQueries(['alarmData', page]);
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
