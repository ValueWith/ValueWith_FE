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

  .fc-day-sun a {
    color: red;
  }

  .fc .fc-daygrid-day-top {
    flex-direction: row;
  }

  .fc-toolbar-chunk {
    display: flex;
    align-items: center;
    h2 {
      display: inline-flex;
    }
    .fc-button-primary:focus,
    .fc .fc-button-primary:not(:disabled).fc-button-active:focus,
    .fc .fc-button-primary:not(:disabled):active:focus {
      box-shadow: none !important;
    }

    .fc-prev-button,
    .fc-next-button,
    .fc .fc-button-primary:not(:disabled).fc-button-active,
    .fc .fc-button-primary:not(:disabled):active,
    .fc .fc-button-primary:not(:disabled).fc-button-active,
    .fc .fc-button-primary:not(:disabled):active {
      background-color: transparent !important;
      border: none !important;
      color: #000 !important;
    }

    .fc-today-button {
      background-color: transparent;
      border: none;
      color: #000;
    }

    .fc .fc-button-primary:not(:disabled).fc-button-active:focus,
    .fc .fc-button-primary:not(:disabled):active:focus {
      box-shadow: none;
    }
  }
`;
