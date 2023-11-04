import { useForm } from 'react-hook-form';

import { useRecoilState } from 'recoil';
import { groupRegistState } from '@/state/GroupResistState';

import Input from '@/components/Input';
import DateInput from '@/components/DateInput';
import Dropdown from '@/components/Dropdown';
import FileUploader from '@/components/uploader/FileUploader';

import * as S from '@components/group/recruit/GroupRegist.styles';
import Button from '@/components/Button';
import useRegistFormValidation from '@/hooks/useRegistFormValidation';

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

function GroupRegistInfo() {
  const [groupFormData, setGroupFormData] = useRecoilState(groupRegistState);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const { isFormError, handleFormValidate } = useRegistFormValidation({
    trigger,
    setError,
  });

  // TODO : 폼 데이터 타입 정의
  const onSubmit = (data: any, event?: any) => {
    handleFormValidate(data, event);

    try {
      console.log('폼 제출', data);
      console.log('그룹 데이터 상태', groupFormData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.GroupRegistContainer>
      <form
        className="flex flex-col h-full"
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleFormValidate}
      >
        {/* 썸네일 업로더 */}
        <FileUploader
          onFileSelected={(file) => {
            setGroupFormData({ ...groupFormData, groupThumbnail: file });
          }}
        />

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

        {/* 지역 선택 */}
        <div className="mb-[24px]">
          <p className="mb-[4px]">지역 선택 *</p>
          <Dropdown
            height="42px"
            listData={AREA_OPTION_LABEL}
            placeholder={'지역을 선택해주세요'}
            selectedItem={groupFormData.groupArea}
            onSelectItem={(item) =>
              setGroupFormData({ ...groupFormData, groupArea: item })
            }
            error={isFormError.groupArea}
          />
        </div>

        {/* 모집 인원 */}
        <Input
          inputType="input"
          type="number"
          label="모집 인원 *"
          style={{ width: '65px' }}
          oninput="this.value = this.value.replace(/[^0-9]/g, '');"
          {...register('groupMemberCount', {
            required: '모집 인원을 입력해주세요.',
            min: {
              value: 1,
              message: '모집 인원은 최소 1명 이상입니다.',
            },
            max: {
              value: 20,
              message: '모집 인원은 최대 20명까지 가능합니다.',
            },
            pattern: {
              value: /^[0-9]*$/,
              message: '숫자만 입력해주세요.',
            },
          })}
          errors={errors}
        >
          <span className="ml-2 text-[13px]">명</span>
        </Input>

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

        <div className="flex mt-auto py-10">
          <Button size="sm" className={'ml-auto'}>
            제출
          </Button>
        </div>
      </form>
    </S.GroupRegistContainer>
  );
}

export default GroupRegistInfo;
