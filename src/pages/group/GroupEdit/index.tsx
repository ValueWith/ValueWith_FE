import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import GroupNavSidebar from '@/components/group/recruit/GroupNavSidebar';
import GroupRegistInfo from '@/components/group/recruit/GroupRegistInfo';
import GroupRegistSchedule from '@/components/group/recruit/GroupRegistSchedule';
import KakaoMap from '@/components/group/recruit/KakaoMap';

import { useEditGroup } from '@/hooks/useRegist';

function GroupEdit() {
  const { pathname } = useLocation();
  const { handleEditData, isEdit, editGroupID } = useEditGroup();
  const [currentStep, setCurrentStep] = useState(1); // Step1 : 기본 정보, Step2 : 일정 선택

  const handleFormStep = (step: number) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    handleEditData(pathname);
  }, [pathname]);

  return (
    <main className="h-full flex">
      <div className="inline-flex">
        <GroupNavSidebar
          selectedStep={currentStep}
          onSelectedStep={handleFormStep}
        />
        <section className="h-full">
          {currentStep === 1 ? (
            <GroupRegistSchedule onSelectedStep={handleFormStep} />
          ) : (
            <GroupRegistInfo
              editGroupID={editGroupID}
              isEdit={isEdit}
              onSelectedStep={handleFormStep}
            />
          )}
        </section>
      </div>
      <div className="flex w-full">
        <KakaoMap />
      </div>
    </main>
  );
}

export default GroupEdit;
