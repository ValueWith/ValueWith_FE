import styled from '@emotion/styled';
import theme from '@/assets/styles/theme';

export const CalendarContainer = styled.div`
  .fc-daygrid-day-frame {
    border: 1px solid transparent;

    &:hover {
      background-color: #f0f7fd;
      cursor: pointer;
    }
  }

  .fc-day-today {
    background: #fff !important;
    border: none !important;

    & > .fc-daygrid-day-frame {
      border: 1px solid #000 !important;
    }
  }

  .fc-daygrid-more-link {
    pointer-events: none;
  }

  .fc-daygrid-dot-event {
    &:hover {
      background: none !important;
    }
  }
`;
