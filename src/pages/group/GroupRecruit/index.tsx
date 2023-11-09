import { useState } from 'react';

import GroupNavSidebar from '@/components/group/recruit/GroupNavSidebar';
import GroupRegistInfo from '@/components/group/recruit/GroupRegistInfo';
import GroupRegistSchedule from '@/components/group/recruit/GroupRegistSchedule';
import KakaoMap from '@/components/group/recruit/KakaoMap';

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
        <KakaoMap />
      </div>
    </main>
  );
}

export default GroupRecruit;
