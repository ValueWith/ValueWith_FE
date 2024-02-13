import { EventContentArg } from '@fullcalendar/core/index.js';
import * as S from './EventContent.styles';

interface EvnetContentProps {
  eventInfo: EventContentArg;
}

function EventContent({ eventInfo }: EvnetContentProps) {
  return (
    <S.EventContentContainer>{eventInfo.event.title}</S.EventContentContainer>
  );
}

export default EventContent;
