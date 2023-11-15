import { useForm } from 'react-hook-form';

import { useRecoilState } from 'recoil';
import {
  groupRegistState,
  selectedPlaceState,
} from '@/recoil/GroupRegistState';

import { useRegistGroup } from '@/hooks/useRegist';
import { formatDueDate, formatTripDate } from '@/utils/dateUtil';

import Input from '@/components/Input';
import DateInput from '@/components/DateInput';
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

function GroupRegistInfo() {
  const [groupFormData, setGroupFormData] = useRecoilState(groupRegistState);
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const { handleFormValidate } = useRegistFormValidation({
    trigger,
    setError,
  });

  const { handleFormSubmit, handleSetOrder, handleFilterArea } =
    useRegistGroup();

  // TODO : 폼 데이터 타입 정의
  const onSubmit = async (data: any, event?: any) => {
    handleFormValidate(data, event);

    try {
      console.log('폼 제출', data);
      console.log('그룹 데이터 상태', groupFormData);
      console.log('선택한 장소', selectedPlace.selectedPlace);

      // 각 카드에 orders 속성 추가
      const setOrderPlace = handleSetOrder(selectedPlace.selectedPlace);

      // 여행 날짜 데이터 포맷 변경
      const departureDate = formatTripDate(data.departureDate);

      // 마감 날짜가 있다면, 마감 날짜 데이터 포맷 변경
      const recruitmentEndDate = formatDueDate(data.recruitmentEndDate);

      // 지역 필터링
      const areaValue = handleFilterArea(selectedPlace.selectedPlace);

      const formPreprocessData = {
        name: data.groupTitle,
        content: data.groupDescription,
        maxMemberNumber: data.groupMemberCount,
        tripArea: areaValue,
        tripDate: departureDate,
        dueDate: recruitmentEndDate,
        places: [...setOrderPlace],
      };

      await handleFormSubmit(formPreprocessData, groupFormData.groupThumbnail);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.GroupRegistContainer className="px-[28px] pt-[28px]">
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
          <Button styleType={isValid ? 'solid' : 'disabled'} fullWidth>
            그룹 모집하기
          </Button>
        </div>
      </form>
    </S.GroupRegistContainer>
  );
}

export default GroupRegistInfo;
