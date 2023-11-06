import { useEffect, useState } from 'react';

import NestedSidebar from '../NestedSidebar';

import * as S from '@components/group/recruit/GroupRegist.styles';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';

import { useGetRecommendedData } from '@/hooks/useRegist';

function GroupRegistSchedule() {
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

  useEffect(() => {
    console.log(recommendedData, 'recommendedData');
  }, [recommendedData]);

  const getSearchData = async () => {
    try {
      if (isNestedSidebar.type === 'search') {
        // 현재 status의 type이 'suggest'라면 카카오맵 로컬 API로 검색
        console.log('카카오맵 로컬 API로 검색');
      } else {
        // 현재 status의 type이 'search'라면 TourAPI로 검색
        console.log('TourAPI로 검색');
        console.log(searchTerm, 'searchTerm');

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
      {recommendedData.map((item, index) => {
        return <div>야호</div>;
      })}

      {isNestedSidebar.status === true && (
        <NestedSidebar option={isNestedSidebar} searchTerm={searchTerm} />
      )}
    </S.GroupRegistContainer>
  );
}

export default GroupRegistSchedule;
