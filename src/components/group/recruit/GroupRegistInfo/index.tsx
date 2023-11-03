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
import Dropdown from '@/components/Dropdown';
import { useRecoilState } from 'recoil';
import { groupRegistState } from '@/state/GroupResistState';

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

const AREA_OPTION = [
  { label: '전체', value: 'all' },
  { label: '강원', value: 'gangwon' },
  { label: '경기', value: 'gyeonggi' },
  { label: '경남', value: 'gyeongnam' },
  { label: '경북', value: 'gyeongbuk' },
  { label: '대구', value: 'daegu' },
  { label: '대전', value: 'daejeon' },
  { label: '부산', value: 'busan' },
  { label: '서울', value: 'seoul' },
  { label: '세종', value: 'sejong' },
  { label: '울산', value: 'ulsan' },
  { label: '인천', value: 'incheon' },
  { label: '전남', value: 'jeonnam' },
  { label: '전북', value: 'jeonbuk' },
  { label: '제주', value: 'jeju' },
  { label: '충남', value: 'chungnam' },
  { label: '충북', value: 'chungbuk' },
];

//areaOption에서 label만 뽑아서 배열로 만들기
const AREA_OPTION_LABEL = AREA_OPTION.map((item) => item.label);

function GroupRegistInfo({
  register,
  control,
  errors,
  isFormError,
}: {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  errors: FieldErrors;
  isFormError: any;
}) {
  const [groupRegistData, setGroupRegistData] =
    useRecoilState(groupRegistState);

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

      <div className="mb-[24px]">
        <p className="mb-[4px]">지역 선택 *</p>
        <Dropdown
          height="42px"
          listData={AREA_OPTION_LABEL}
          placeholder={'지역을 선택해주세요'}
          selectedItem={groupRegistData.groupArea}
          onSelectItem={(item) =>
            setGroupRegistData({ ...groupRegistData, groupArea: item })
          }
          error={isFormError.groupArea}
        />
      </div>

      {/* 그룹 이름 */}
      <Input
        inputType="input"
        label="그룹 이름 *"
        {...register('groupTitle', {
          required: '그룹 이름을 입력해주세요.',
        })}
        errors={errors}
      />

      {/* 그룹 설명 */}
      <Input
        inputType="textarea"
        label="그룹 설명"
        {...register('groupDescription')}
        errors={errors}
      />

      <button>폼 제출 테스트 버튼</button>
    </S.GroupRegistContainer>
  );
}

export default GroupRegistInfo;
