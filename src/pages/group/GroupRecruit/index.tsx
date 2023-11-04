import { useEffect, useState } from 'react';

import GroupNavSidebar from '@/components/group/recruit/GroupNavSidebar';
import GroupRegistInfo from '@/components/group/recruit/GroupRegistInfo';
import GroupRegistSchedule from '@/components/group/recruit/GroupRegistSchedule';
import useRegistFormValidation from '@/hooks/useRegistFormValidation';
import { groupRegistState } from '@/state/GroupResistState';

import { useForm } from 'react-hook-form';
import { Map } from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';

function GroupRecruit() {
  const [currentStep, setCurrentStep] = useState(1); // Step1 : 기본 정보, Step2 : 일정 선택
  const [groupRegist, _setGroupRegist] = useRecoilState(groupRegistState);
  const [isValidate, setIsValidate] = useState(false); // 폼 유효성 검사

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

  const handleFormStep = (step: number) => {
    setCurrentStep(step);
  };

  const onSubmit = (data: any) => {
    // 폼 유효성 검사
    handleFormValidate(data);

    console.log('폼 제출', data);
    console.log('그룹 데이터 상태', groupRegist);

    setIsValidate(true);
  };

  return (
    <main className="h-full flex">
      <div className="inline-flex">
        <GroupNavSidebar
          selectedStep={currentStep}
          onSelectedStep={handleFormStep}
        />
        <section>
          {currentStep === 1 ? (
            <form
              id="groupRegistForm"
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={handleFormValidate}
            >
              <GroupRegistInfo
                register={register}
                control={control}
                errors={errors}
                isValidate={isValidate}
                isFormError={isFormError}
              />
            </form>
          ) : (
            <GroupRegistSchedule />
          )}
        </section>
      </div>
      <div className="flex w-full">
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
          style={{ width: '100%', height: '100%' }} // 지도 크기
          level={3} // 지도 확대 레벨
        ></Map>
      </div>
    </main>
  );
}

export default GroupRecruit;
