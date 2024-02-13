import styled from '@emotion/styled';
import theme from '@/assets/styles/theme';

export const CalendarContainer = styled.div`
  .fc {
    th[role='columnheader'] {
      background-color: #f8f8f8;
      height: 42px;
      line-height: 42px;
      font-weight: 500;
    }

    .fc-scrollgrid {
      border-collapse: collapse;
    }

    .fc-theme-standard td {
      border: 1px solid #e6e6e6 !important;
    }

    .fc-theme-standard th,
    .fc-scrollgrid {
      border: none !important;
    }

    .fc-scrollgrid {
      border-top: 2px solid #adadad !important;
    }

    .fc-toolbar-title {
      font-size: 22px;
    }

    .fc-button-primary {
      &:not(:disabled) {
        &.fc-button-active,
        &:active {
          background-color: transparent !important;
          border: none !important;
          color: #000 !important;
        }

        &:focus {
          box-shadow: none !important;
        }
      }
    }
  }

  /* 캘린더 헤더 스타일 */
  .fc-toolbar-chunk {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;

    h2 {
      display: inline-flex;
      justify-content: center;
      min-width: 115px;
    }

    .fc-button-primary {
      &:focus,
      &.fc-button-active,
      &:active {
        box-shadow: none !important;
        background-color: transparent !important;
        border: none !important;
        color: #000 !important;
      }
    }

    .fc-prev-button,
    .fc-next-button,
    .fc-today-button {
      background-color: transparent;
      border: none;
      color: #000;
      padding: 0;

      &.fc-prev-button,
      &.fc-next-button {
        width: 24px;
        height: 24px;
        .fc-icon {
          vertical-align: initial;
        }
      }

      .fc-today-button {
        margin-left: 24px;
        font-size: 18px;

        &:disabled {
          color: ${theme.color.gray400} !important;
        }
      }
    }
  }

  /* 캘린더 날짜 스타일 */
  .fc-daygrid-day-frame {
    border: 1px solid transparent;

    &:hover {
      background-color: #f0f7fd;
      cursor: pointer;
    }
  }

  /* 해당일 스타일 */
  .fc-day-today {
    background: #fff !important;
    border: none !important;

    & > .fc-daygrid-day-frame {
      border: 1px solid #000 !important;
    }
  }

  /* dayMaxEvnet 커스텀 팝오버 금지 */
  .fc-daygrid-more-link {
    pointer-events: none;
  }

  .fc-daygrid-dot-event {
    &:hover {
      background: none !important;
    }
  }

  /* 일요일 색상  */
  .fc-day-sun a {
    color: red;
  }
`;
