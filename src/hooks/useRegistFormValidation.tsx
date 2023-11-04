import { groupRegistState } from '@/state/GroupResistState';
import { useState } from 'react';
import { FieldValues, UseFormSetError, UseFormTrigger } from 'react-hook-form';
import { useRecoilState } from 'recoil';

interface useRegistFormValidationProps {
  trigger: UseFormTrigger<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  data?: any;
}

function useRegistFormValidation({
  trigger,
  setError,
  data,
}: useRegistFormValidationProps) {
  const [groupRegist, _setGroupRegist] = useRecoilState(groupRegistState);
  const [isFormError, setIsFormError] = useState({
    groupArea: false,
  });

  const handleFormValidate = (data: any, event?: React.KeyboardEvent) => {
    if (event && event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      trigger();

      if (groupRegist.groupArea === '') {
        return setIsFormError({ ...isFormError, groupArea: true });
      }
    }

    // 모집 마감 날짜가 있다면, 모집 마감 날짜가 여행 날짜보다 빠른지 검사
    if (data.recruitmentEndDate) {
      if (data.recruitmentEndDate > data.departureDate) {
        setError('recruitmentEndDate', {
          type: 'manual',
          message: '모집 마감 날짜는 여행 날짜 이전이어야 합니다.',
        });
        return;
      }
    }
  };

  return {
    isFormError,
    handleFormValidate,
  };
}

export default useRegistFormValidation;
