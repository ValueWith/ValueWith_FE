import { useEffect, useState } from 'react';

import GroupNavSidebar from '@/components/group/recruit/GroupNavSidebar';
import GroupRegistInfo from '@/components/group/recruit/GroupRegistInfo';
import GroupRegistSchedule from '@/components/group/recruit/GroupRegistSchedule';
import KakaoMap from '@/components/group/recruit/KakaoMap';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { selectedPlaceState, tempFormState } from '@/recoil/GroupRegistState';
import { fetchGroupDetail } from '@/apis/groupDetail';

function GroupEdit() {
  const [currentStep, setCurrentStep] = useState(1); // Step1 : 기본 정보, Step2 : 일정 선택

  const handleFormStep = (step: number) => {
    setCurrentStep(step);
  };

  const { pathname } = useLocation();
  const [tempFormData, setTempFormData] = useRecoilState(tempFormState);
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);

  useEffect(() => {
    const fetchData = async () => {
      if (pathname.startsWith('/group/edit')) {
        const match = pathname.match(/\/(\d+)$/);

        if (match) {
          const groupId = match[1];
          const response = await fetchGroupDetail(Number(groupId));
          console.log(response);

          const preProcessData = response.places.map((item: any) => {
            return {
              placeCode: item.placeCode,
              name: item.name,
              address: item.address,
              category: item.category,
              orders: item.orders,
              x: Number(item.x),
              y: Number(item.y),
            };
          });

          console.log(preProcessData);
          setSelectedPlace({ selectedPlace: preProcessData });

          console.log(response);
          const tempFormData = {
            groupTitle: response.tripGroupDetail.name,
            groupDescription: response.tripGroupDetail.content,
            groupMemberCount: response.tripGroupDetail.maxUserNumber,
            departureDate: new Date(response.tripGroupDetail.tripDate),
            recruitmentEndDate: new Date(response.tripGroupDetail.dueDate),
            groupThumbnail: response.tripGroupDetail.thumbnailUrl,
          };

          setTempFormData(tempFormData);
        } else {
          console.log('No match found');
        }
      }
    };

    fetchData();
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
            <GroupRegistInfo onSelectedStep={handleFormStep} />
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
