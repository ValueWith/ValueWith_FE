import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useInView } from 'react-intersection-observer';

import { AlarmContent, readAllAlarm } from '@/apis/alarm';
import { useGetAlarmData } from '@/hooks/useAlarm';

import AlarmCard from '../AlarmCard';
import Loader from '@/components/Loader';

import * as S from './AlarmModal.styles';

interface AlarmModalProps {
  onClose: () => void;
}

function AlarmModal({ onClose }: AlarmModalProps) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useGetAlarmData(page);

  const [alarmContents, setAlarmContents] = useState<AlarmContent[]>(
    data ? data.content : []
  );

  useEffect(() => {
    if (data) {
      setAlarmContents((prev) => {
        // prev와 data.content를 JSON 문자열로 변환하여 비교
        const prevStr = JSON.stringify(prev);
        const newDataStr = JSON.stringify(data.content);

        // prev와 data.content가 다르면 실행
        if (prevStr !== newDataStr) {
          return [...prev, ...data.content];
        }

        // 같으면 이전 상태 그대로 반환
        return prev;
      });
    }
  }, [data]);

  const handlePage = (inView: boolean) => {
    if (inView && !isLoading && !data?.last) {
      setPage((page) => page + 1);
    }
  };

  const { ref } = useInView({
    triggerOnce: false,
    threshold: 0.5,
    onChange: handlePage,
  });

  const handleReadAll = async () => {
    await readAllAlarm();
    queryClient.invalidateQueries(['alarmData', page]);
  };

  return (
    <>
      <S.Dimmed onClick={() => onClose()} />
      <S.AlarmModalContainer>
        <S.AlarmModalTitleContainer>
          <S.AlarmModalTitle>알림</S.AlarmModalTitle>
          <S.AlarmReadAll onClick={handleReadAll}>모두읽기</S.AlarmReadAll>
        </S.AlarmModalTitleContainer>
        {isLoading && <Loader />}
        {alarmContents &&
          alarmContents.map((alarmData: AlarmContent) => (
            <AlarmCard key={alarmData.alertId} data={alarmData} page={page} />
          ))}
        <div ref={ref} />
      </S.AlarmModalContainer>
    </>
  );
}

export default AlarmModal;
