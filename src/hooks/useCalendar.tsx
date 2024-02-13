import EventContent from '@/components/common/calendar/EventContent';
import { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import { DateClickArg } from '@fullcalendar/interaction';

import { useState } from 'react';

interface IGetScheduleForm {
  startDate: null | Date;
  endDate: null | Date;
}

export const useCalendar = () => {
  const [period, setPeriod] = useState<IGetScheduleForm>({
    startDate: null,
    endDate: null,
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpenScheduleDialog, setIsOpenScheduleDialog] = useState(false);

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

  return {
    onDateClick,
    onChangeDate,
    eventContent,
    period,
    selectedDate,
    isOpenScheduleDialog,
  };
};
