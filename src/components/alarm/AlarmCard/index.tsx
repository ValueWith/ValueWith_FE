import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { AlarmContent, deleteAlarm, readAlarm } from '@/apis/alarm';
import { formatAlarmDate } from '@/utils/dateUtil';

import { AiOutlineClose } from 'react-icons/ai';
import * as S from './AlarmCard.styles';
import { useNavigate } from 'react-router-dom';

interface AlarmCardProps {
  data: AlarmContent;
  page: number;
  clickReadAll: boolean;
}

function AlarmCard({ data, page, clickReadAll }: AlarmCardProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createdDate = formatAlarmDate(data.createdDateTime);

  const [clickDelete, setClickDelete] = useState<boolean>(false);
  const [clickRead, setClickRead] = useState<boolean>(false);

  const handleDelete = async () => {
    await deleteAlarm(data.alertId);
    if (page === 0) {
      queryClient.invalidateQueries(['alarmData', page]);
    }
    setClickDelete(true);
  };

  const handleRead = async () => {
    await readAlarm(data.alertId);
    if (page === 0) {
      queryClient.invalidateQueries(['alarmData', page]);
    }
    setClickRead(true);
    navigate(data.redirectUrl);
  };

  const getCardStyleClassName = () =>
    clickRead || clickReadAll || data.isChecked ? 'checked' : '';

  return (
    <S.AlarmCardContainer style={{ display: clickDelete ? 'none' : '' }}>
      <S.AlarmCardContentContainer onClick={handleRead}>
        <S.AlarmCardContent className={getCardStyleClassName()}>
          <S.AlarmCardGroupName className={getCardStyleClassName()}>
            {data.groupName}
          </S.AlarmCardGroupName>
          {data.content.content}
        </S.AlarmCardContent>
        <S.AlarmCardDate className={getCardStyleClassName()}>
          {createdDate}
        </S.AlarmCardDate>
      </S.AlarmCardContentContainer>
      <button className='cursor-pointer' onClick={handleDelete}>
        <AiOutlineClose size={13} style={{ color: '#878787' }} />
      </button>
    </S.AlarmCardContainer>
  );
}

export default AlarmCard;
