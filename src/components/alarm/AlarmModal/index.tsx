import { useGetAlarmData } from '@/hooks/useAlarm';
import * as S from './AlarmModal.styles';
import Loader from '@/components/Loader';
import AlarmCard from '../AlarmCard';
import { AlarmData } from '@/apis/alarm';

interface AlarmModalProps {
  onClose: () => void;
}

function AlarmModal({ onClose }: AlarmModalProps) {
  const { data, isLoading, isError } = useGetAlarmData();

  return (
    <>
      <S.Dimmed onClick={() => onClose()} />
      <S.AlarmModalContainer>
        {isLoading && <Loader />}
        {isError && <div>Error...</div>}
        <S.AlarmModalTitleContainer>
          <S.AlarmModalTitle>알림</S.AlarmModalTitle>
          <S.AlarmReadAll>모두읽기</S.AlarmReadAll>
        </S.AlarmModalTitleContainer>

        {data &&
          Array.isArray(data) &&
          data.map((alarmData: AlarmData) => (
            <AlarmCard key={alarmData.alertId} data={alarmData} />
          ))}
      </S.AlarmModalContainer>
    </>
  );
}

export default AlarmModal;
