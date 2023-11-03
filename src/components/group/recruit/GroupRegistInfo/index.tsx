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

const DATE_ATTRIBUTES = [
  {
    name: 'departureDate',
    label: '여행 날짜 선택 *',
    rules: {
      required: '여행날짜를 입력해주세요.',
    },
  },
  {
    name: 'recruitmentEndDate',
    label: '모집 마감 날짜',
  },
];

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
      {/* 여행 날짜 / 마감 날짜 선택 */}
      {DATE_ATTRIBUTES.map((item, index) => (
        <DateInput
          key={index}
          control={control}
          name={item.name}
          label={item.label}
          rules={item.rules}
          errors={errors}
        ></DateInput>
      ))}

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
