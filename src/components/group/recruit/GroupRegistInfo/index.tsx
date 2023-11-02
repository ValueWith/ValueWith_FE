import { useRef, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

import { RiCalendar2Fill } from 'react-icons/ri';
import Input from '@/components/Input';
import DatePicker from 'react-datepicker';
import DateInput from '@/components/DateInput';

import * as S from '@components/group/recruit/GroupRegist.styles';

function GroupRegistInfo({
  register,
  control,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  errors: FieldErrors;
}) {
  return (
    <S.GroupRegistContainer>
      {/* 여행 날짜 선택 */}
      <div>
        <Controller
          control={control}
          name="departureDate"
          rules={{ required: '여행날짜를 입력해주세요.' }}
          render={({ field }) => (
            <>
              <DatePicker
                name="departureDate"
                dateFormat="yyyy.MM.dd"
                shouldCloseOnSelect
                minDate={new Date()}
                selected={field.value}
                onChange={field.onChange}
              />
              <RiCalendar2Fill fill="#4e4e4e" className="calendarIcon" />
            </>
          )}
        />
        {errors.departureDate && (
          <p className="text-red-600 text-sm cursor-default">
            {errors.departureDate.message as string}
          </p>
        )}
      </div>

      {/* 모집 마감일 */}
      <DateInput
        control={control}
        name={'recruitmentEndDate'}
        label="모집 마감일"
        rules={{
          required: '모집 마감일을 입력해주세요.',
        }}
        errors={errors}
      ></DateInput>

      {/* 그룹 이름 */}
      <Input
        inputType="input"
        label="그룹 이름 *"
        {...register('groupTitle', {
          required: '그룹 이름을 입력해주세요.',
        })}
        errors={errors}
      />

      <button>폼 제출 테스트 버튼</button>
    </S.GroupRegistContainer>
  );
}

export default GroupRegistInfo;
