import * as S from './AlarmModal.styles';
import AlarmCard from '../AlarmCard';
import { AlarmData } from '@/apis/alarm';

interface AlarmModalProps {
  onClose: () => void;
  data: AlarmData | undefined;
}

function AlarmModal({ onClose, data }: AlarmModalProps) {
  return (
    <>
      <S.Dimmed onClick={() => onClose()} />
      <S.AlarmModalContainer>
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
