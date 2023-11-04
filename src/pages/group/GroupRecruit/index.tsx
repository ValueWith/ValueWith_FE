import { useState } from 'react';

import GroupNavSidebar from '@/components/group/recruit/GroupNavSidebar';
import GroupRegistInfo from '@/components/group/recruit/GroupRegistInfo';
import GroupRegistSchedule from '@/components/group/recruit/GroupRegistSchedule';

import { Map } from 'react-kakao-maps-sdk';

function GroupRecruit() {
  const [currentStep, setCurrentStep] = useState(1); // Step1 : 기본 정보, Step2 : 일정 선택

  const handleFormStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <main className="h-full flex">
      <div className="inline-flex">
        <GroupNavSidebar
          selectedStep={currentStep}
          onSelectedStep={handleFormStep}
        />
        <section className="h-full">
          {currentStep === 1 ? <GroupRegistSchedule /> : <GroupRegistInfo />}
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
