import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import * as S from './Calendar.styles';
import EventContent from '../EventContent';

interface IGetScheduleForm {
  startDate: null | Date;
  endDate: null | Date;
}

const Calendar = () => {
  const [period, setPeriod] = useState<IGetScheduleForm>({
    startDate: null,
    endDate: null,
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpenScheduleDialog, setIsOpenScheduleDialog] = useState(false);

  const scheduleList = [
    {
      title: '여행 그룹',
      openDate: 'Wed Feb 14 2024 04:01:56 GMT+0900',
    },
    {
      title: '여행 그룹1',
      openDate: 'Wed Feb 15 2024 04:01:56 GMT+0900',
    },
    {
      title: '여행 그룹2',
      openDate: 'Wed Feb 15 2024 04:01:56 GMT+0900',
    },
    {
      title: '여행 그룹3여행 그룹여행 그룹여행 그룹3',
      openDate: 'Wed Feb 15 2024 04:01:56 GMT+0900',
    },
    {
      title: '여행 그룹4여행 그룹여행 그룹여행 그룹여행 그룹4',
      openDate: 'Wed Feb 15 2024 04:01:56 GMT+0900',
    },
  ];

  //   const { data: scheduleList } = useQuery(
  //     [PRODUCT.SCHEDULE, period.startDate],
  //     () =>
  //       getProductSchedule({
  //         startDate: period.startDate,
  //         endDate: period.endDate,
  //       }),
  //     {
  //       enabled: !!period.startDate,
  //     }
  //   );

  useEffect(function setCalendarEventHeightHack() {
    const calendarElement = document.getElementsByClassName(
      'fc-scrollgrid-sync-table'
    )[0];

    if (calendarElement.tagName == 'TABLE') {
      const trElements = calendarElement.getElementsByTagName('tr');

      for (let i = 0; i < trElements.length; i++) {
        const tr = trElements[i];

        tr.style.height = `${100 / trElements.length}%`;
      }
    }
  });

  const events = scheduleList?.map((schedule) => {
    const openDate = new Date(schedule.openDate);

    return {
      title: schedule.title,
      start: openDate,
      eventColor: '#3182f6',
    };
  });

  const onDateClick = ({ date }: DateClickArg) => {
    onOpenScheduleDialog(date);
  };

  const onChangeDate = ({ startStr, endStr }: DatesSetArg) => {
    setPeriod({ startDate: new Date(startStr), endDate: new Date(endStr) });
  };

  const onOpenScheduleDialog = (selected: Date) => {
    setSelectedDate(selected);
    setIsOpenScheduleDialog(true);
  };

  const eventContent = (eventInfo: EventContentArg) => {
    return <EventContent eventInfo={eventInfo} />;
  };

  return (
    <>
      <S.CalendarContainer>
        <FullCalendar
          locale="ko"
          plugins={[dayGridPlugin, interactionPlugin]}
          events={events}
          dayMaxEvents={3}
          datesSet={onChangeDate}
          dateClick={onDateClick}
          eventContent={eventContent}
          headerToolbar={{
            start: 'prev title next today',
            center: '',
            end: '',
          }}
          buttonText={{
            today: '오늘',
          }}
        />
      </S.CalendarContainer>
    </>
  );
};

export default Calendar;
