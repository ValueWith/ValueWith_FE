import { groupRegistState } from '@/recoil/GroupRegistState';
import { useState } from 'react';
import { FieldValues, UseFormSetError, UseFormTrigger } from 'react-hook-form';
import { useRecoilState } from 'recoil';

interface useRegistFormValidationProps {
  trigger: UseFormTrigger<FieldValues>;
  setError: UseFormSetError<FieldValues>;
}

function useRegistFormValidation({
  trigger,
  setError,
}: useRegistFormValidationProps) {
  const [groupFormData, setGroupFormData] = useRecoilState(groupRegistState);
  const [isFormError, setIsFormError] = useState({
    groupArea: false,
  });

  const handleFormValidate = (data: any, event?: React.KeyboardEvent) => {
    console.log(event);

    // 엔터키가 눌린 경우 input 태그가 아닌 항목에 유효성 검사
    // 그룹 지역이 빈 값이라면, 폼 검증 여부를 false로 변경
    if (event && event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      trigger();
    }

    // 모집 마감 날짜가 있다면, 모집 마감 날짜가 여행 날짜보다 빠른지 검사
    if (data.recruitmentEndDate) {
      if (data.recruitmentEndDate > data.departureDate) {
        return setError('recruitmentEndDate', {
          type: 'manual',
          message: '모집 마감 날짜는 여행 날짜 이전이어야 합니다.',
        });
      }
    }
  };

  return {
    isFormError,
    handleFormValidate,
  };
}

export default useRegistFormValidation;
