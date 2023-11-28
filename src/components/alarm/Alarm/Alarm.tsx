import { AiOutlineBell } from 'react-icons/ai';

import * as S from './Alarm.styles';
import { useState } from 'react';
import AlarmModal from '../AlarmModal';
import { useGetAlarmData } from '@/hooks/useAlarm';

function Alarm() {
  const [isAlarmModal, setIsAlarmModal] = useState<boolean>(false);

  const { data } = useGetAlarmData();

  const alarmCount = Array.isArray(data) ? data.length : 0;

  return (
    <>
      <AiOutlineBell size={24} onClick={() => setIsAlarmModal(true)} />
      <S.AlarmCount>{alarmCount}</S.AlarmCount>
      {isAlarmModal && (
        <AlarmModal onClose={() => setIsAlarmModal(false)} data={data} />
      )}
    </>
  );
}

export default Alarm;
