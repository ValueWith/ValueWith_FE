import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';

import { getMonth, getYear } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as S from '@components/Input/Input.styles'; // Wrapper 스타일
import * as InputStyle from './DateInput.styles'; // 컴포넌트 스타일
import styles from '@/lib/DatePicker.module.css'; // 클래스 스타일

import { RiCalendar2Fill } from 'react-icons/ri';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface RulesProps {
  required?: string;
}

interface DateInputProps {
  name: string;
  control: Control<FieldValues>;
  label?: string;
  errors?: FieldErrors | undefined;
  rules?: RulesProps;
  defaultValue?: Date | undefined;
}

function DateInput({
  control,
  name,
  label,
  errors,
  rules,
  defaultValue,
}: DateInputProps) {
  const errorKEY = errors?.[name as string]?.message as string;

  const currentYear = new Date().getFullYear();
  const yearsToDisplay = 5;

  const YEARS = Array.from(
    { length: yearsToDisplay },
    (_, i) => currentYear + i
  );

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <S.InputContainer>
      {label && <S.InputLabel htmlFor={name}>{label}</S.InputLabel>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <InputStyle.DateInput>
            <DatePicker
              name={name}
              className={errorKEY ? 'error dateInput' : 'dateInput'}
              dateFormat="yyyy.MM.dd"
              popperPlacement="bottom-end"
              autoComplete="off"
              minDate={new Date()}
              selected={field.value}
              onChange={field.onChange}
              formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
              dayClassName={(d) =>
                d.getMonth() === field.value?.getMonth() &&
                d.getDate() === field.value?.getDate()
                  ? styles.selectedDay
                  : styles.unselectedDay
              }
              shouldCloseOnSelect
              showYearDropdown
              scrollableYearDropdown
              disabledKeyboardNavigation
              renderCustomHeader={({
                date,
                changeYear,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className={styles.customHeaderContainer}>
                  <div>
                    <span className={styles.month}>
                      {MONTHS[getMonth(date)]}
                    </span>
                    <select
                      value={getYear(date)}
                      className={styles.year}
                      onChange={({ target: { value } }) => changeYear(+value)}
                    >
                      {YEARS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={decreaseMonth}
                      className={styles.monthButton}
                      disabled={prevMonthButtonDisabled}
                    >
                      <AiOutlineLeft
                        fill="#fff"
                        className="w-[14px] h-[14px]"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={increaseMonth}
                      className={styles.monthButton}
                      disabled={nextMonthButtonDisabled}
                    >
                      <AiOutlineRight
                        fill="#fff"
                        className="w-[14px] h-[14px]"
                      />
                    </button>
                  </div>
                </div>
              )}
            />
            <RiCalendar2Fill fill="#4e4e4e" className="calendarIcon" />
          </InputStyle.DateInput>
        )}
      />

      {errorKEY && <S.InputErrorMessage>{errorKEY}</S.InputErrorMessage>}
    </S.InputContainer>
  );
}

export default DateInput;
