import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as S from '@components/Input/Input.styles';
import { RiCalendar2Fill } from 'react-icons/ri';

interface RulesProps {
  required?: string;
}

interface DateInputProps {
  name: string;
  control: Control<FieldValues>;
  label?: string;
  errors?: FieldErrors | undefined;
  rules?: RulesProps;
}

function DateInput({ control, name, label, errors, rules }: DateInputProps) {
  const errorKEY = errors?.[name as string]?.message as string;

  return (
    <S.InputContainer>
      {label && <S.InputLabel htmlFor={name}>{label}</S.InputLabel>}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <div className="">
            <DatePicker
              name={name}
              dateFormat="yyyy.MM.dd"
              minDate={new Date()}
              selected={field.value}
              onChange={field.onChange}
              shouldCloseOnSelect
            />
            <RiCalendar2Fill fill="#4e4e4e" className="calendarIcon" />
          </div>
        )}
      />

      {errorKEY && <S.InputErrorMessage>{errorKEY}</S.InputErrorMessage>}
    </S.InputContainer>
  );
}

export default DateInput;
