import { useEffect, useState } from 'react';

import NestedSidebar from '../NestedSidebar';

import * as S from '@components/group/recruit/GroupRegist.styles';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';

import { useGetRecommendedData } from '@/hooks/useRegist';
import useMapSearch from '@/hooks/useMapSearch';

function GroupRegistSchedule() {
  const [tripData, setTripData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isNestedSidebar, setIsNestedSidebar] = useState({
    status: false,
    type: 'search', // 'suggest' | 'search'
  });

  const {
    isTourLoading,
    isTourError,
    isTourSuccess,
    TourRefetch,
    recommendedData,
  } = useGetRecommendedData(searchTerm);

  const getSearchData = async () => {
    try {
      if (isNestedSidebar.type === 'suggest') {
        TourRefetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchTerm = async (
    term: string,
    type: 'suggest' | 'search',
    toggled?: boolean
  ) => {
    setIsNestedSidebar({
      type: type,
      status: toggled ? !isNestedSidebar.status : true,
    });
    setSearchTerm(term);

    await getSearchData();
  };

  return (
    <S.GroupRegistContainer>
      {/* 검색창 */}
      <div className="registGroup">
        <SearchBar
          onSearchTermChange={(term) => handleSearchTerm(term, 'search')}
        />
      </div>

      {/* 장소 추천  */}
      <div className="flex justify-end items-center font-medium text-[15px]">
        어디로 가야할지 모르겠다면?
        <Button
          type="button"
          styleType="text"
          className="ml-2"
          style={{
            minWidth: 'auto',
            fontSize: '15px',
          }}
          onClickHandler={() => handleSearchTerm(searchTerm, 'suggest', true)}
        >
          장소 추천 받기
        </Button>
      </div>

      {isNestedSidebar.status === true && (
        <NestedSidebar
          option={isNestedSidebar}
          searchTerm={searchTerm}
          data={recommendedData}
        />
      )}
    </S.GroupRegistContainer>
  );
}

export default GroupRegistSchedule;
