import { formatDateObject } from '@/utils/dateUtil';

import DefaultModalTemplate from '@/components/template/DefaultModalTemplate';
import * as S from './DetailInfo.styles';
import CalendarDetailBox from '@/components/common/calendar/CalendarDetailBox';
import Loader from '@/components/common/Loader';

interface DetailInfoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedDate: Date | null;
}

function DetailInfo({ open, setOpen, selectedDate }: DetailInfoProps) {
  const dateInfo = selectedDate
    ? formatDateObject(selectedDate)
    : { formattedDate: '', day: '' };

  const calendarDayDetailInfo = [
    {
      title: '여행 그룹1',
      reviewContent: {
        contentTitle: '여행 후기',
        content: '여행 후기 내용입니다.',
      },
      url: 'https://www.naver.com',
    },
    {
      title: '여행 그룹2',
      reviewContent: {
        contentTitle: '여행 후기',
        content: '여행 후기 내용입니다.',
      },
      url: 'https://www.naver.com',
    },
    {
      title: '여행 그룹3',
      reviewContent: {
        contentTitle: '여행 후기',
        content: '여행 후기 내용입니다.',
      },
      url: 'https://www.naver.com',
    },
    {
      title: '여행 그룹4여행 그룹여행 그룹여행 그룹여행 그룹여행 그룹여행 그룹',
      reviewContent: {
        contentTitle: '',
        content: '',
      },
      url: 'https://www.naver.com',
    },
  ];

  return (
    <DefaultModalTemplate
      isOpen={open}
      setIsOpen={setOpen}
      className="calendarDetailInfo"
    >
      {dateInfo.formattedDate !== '' && calendarDayDetailInfo.length > 0 ? (
        <>
          <S.DetailInfoContainer>
            {dateInfo.formattedDate} <span>{dateInfo.day}</span>
          </S.DetailInfoContainer>

          <CalendarDetailBox dayDatailInfo={calendarDayDetailInfo} />
        </>
      ) : (
        <Loader />
      )}
    </DefaultModalTemplate>
  );
}

export default DetailInfo;
