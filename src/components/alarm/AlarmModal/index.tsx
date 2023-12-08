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

interface AlarmPageContent {
  page: number;
  content: AlarmContent[];
}

function AlarmModal({ onClose }: AlarmModalProps) {
  const queryClient = useQueryClient();

  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useGetAlarmData(page);

  const [alarmContents, setAlarmContents] = useState<AlarmPageContent[]>([
    {
      page: data ? data.pageable.pageNumber : 0,
      content: data ? data.content : [],
    },
  ]);
  const [clickReadAll, setClickReadAll] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setAlarmContents((prev) => {
        const existingPageDataIndex = prev.findIndex(
          (item) => item.page === data.pageable.pageNumber
        );

        if (existingPageDataIndex !== -1) {
          // 이미 해당 페이지의 데이터가 있으면 해당 데이터를 갱신
          const updatedPageData = {
            ...prev[existingPageDataIndex],
            content: data.content,
          };

          // 배열을 복사하고 갱신된 데이터를 적용
          const updatedData = [...prev];
          updatedData[existingPageDataIndex] = updatedPageData;

          return updatedData;
        } else {
          // 해당 페이지의 데이터가 없으면 새로운 데이터를 추가
          const newPageData = {
            page: data.pageable.pageNumber,
            content: data.content,
          };

          return [...prev, newPageData];
        }
      });
    }
  }, [data]);

  const handlePage = (inView: boolean) => {
    if (data) {
      if (inView && !isLoading && !data.last) {
        setPage((page) => page + 1);
      }
    }
  };

  const { ref } = useInView({
    threshold: 0.8,
    onChange: handlePage,
  });

  const handleReadAll = async () => {
    await readAllAlarm();
    setClickReadAll(true);
    queryClient.invalidateQueries(['alarmData', 0]);
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
          alarmContents.map((alarmData: AlarmPageContent) =>
            alarmData.content.map((item) => (
              <AlarmCard
                key={item.alertId}
                data={item}
                page={alarmData.page}
                clickReadAll={clickReadAll}
              />
            ))
          )}
        <div ref={ref} />
      </S.AlarmModalContainer>
    </>
  );
}

export default AlarmModal;
