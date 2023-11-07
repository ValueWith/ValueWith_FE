import { useEffect, useState } from 'react';

import NestedSidebar from '../NestedSidebar';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import * as S from '@components/group/recruit/GroupRegist.styles';
import * as CS from '@components/group/recruit/GroupRegist.styles';

import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';

import { useGetRecommendedData } from '@/hooks/useRegist';
import { useRecoilState } from 'recoil';
import { selectedPlaceState } from '@/state/GroupRegistState';
import GroupItemCard from '../GroupItemCard';

function GroupRegistSchedule() {
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
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

  const onDragEnd = (result: any) => {
    // 리스트 밖으로 드래그한 경우
    if (!result.destination) return;

    const reorderedData = Array.from(selectedPlace.selectedPlace);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);
    setSelectedPlace({ selectedPlace: reorderedData });
  };

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
    <div className="relative h-full flex flex-col">
      <S.GroupRegistContainer>
        {/* 검색창 */}
        <div className="registGroup">
          <SearchBar
            onSearchTermChange={(term) => handleSearchTerm(term, 'search')}
          />
        </div>

        {/* 장소 추천  */}
        <div className="flex justify-end items-center font-medium text-[15px] px-[24px]">
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

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="one">
            {(provided) => (
              <CS.GroupItemCardContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <>
                  {selectedPlace.selectedPlace.map((item: any, index: any) => (
                    <GroupItemCard
                      key={`${index}-${item.id}`}
                      item={item}
                      index={index}
                      type={'registed'}
                    />
                  ))}
                </>
                {provided.placeholder}
              </CS.GroupItemCardContainer>
            )}
          </Droppable>
        </DragDropContext>
      </S.GroupRegistContainer>

      <div className="flex flex-col mt-auto py-10 px-[24px]">
        <Button
          type="button"
          styleType="outline"
          fullWidth
          style={{
            marginBottom: '8px',
          }}
        >
          최적경로 추천받기
        </Button>
        <Button type="button" fullWidth>
          다음
        </Button>
      </div>

      {isNestedSidebar.status === true && (
        <NestedSidebar
          option={isNestedSidebar}
          searchTerm={searchTerm}
          data={recommendedData}
        />
      )}
    </div>
  );
}

export default GroupRegistSchedule;
