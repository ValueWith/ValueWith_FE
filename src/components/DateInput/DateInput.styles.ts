import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const DateInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 42px;
  border: 0;
  font: inherit;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid ${theme.color.gray200};
  background-color: #f8f8f8;

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .react-datepicker-wrapper {
    position: relative;
    z-index: 2;
    background-color: transparent;
  }

  .dateInput {
    width: 100%;
    height: 100%;
    padding: 0 16px;
    background-color: transparent;
    caret-color: transparent;
    border-radius: 4px;
    cursor: pointer;

    &.error {
      border: 1px solid ${theme.color.red300};
    }
  }

  .react-datepicker {
    border: 0;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__header {
    background-color: ${theme.color.primary};
    border: 0;
    color: #fff;
  }

  .react-datepicker__day {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${theme.color.primary};
    height: 100%;
    margin-top: 8px;
    padding: 0 14px;
    color: #fff;
  }

  .react-datepicker__day-name {
    width: 36px;
    color: #fff;
  }

  .react-datepicker__day--outside-month {
    cursor: default;
    visibility: hidden;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .calendarIcon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    min-width: 24px;
    height: 24px;
    z-index: 0;
  }
`;
