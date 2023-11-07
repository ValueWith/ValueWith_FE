import { useEffect, useState } from 'react';

import NestedSidebar from '../NestedSidebar';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
    console.log('드래그 종료');
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
    <div className="relative h-full">
      <S.GroupRegistContainer>
        {/* 검색창 */}
        <div className="registGroup" style={{ position: 'sticky', top: '0' }}>
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

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="one">
            {(provided) => (
              <CS.GroupItemCardContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {selectedPlace.selectedPlace.map((item: any, index: any) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => (
                      <GroupItemCard
                        item={item}
                        index={index}
                        type={'registed'}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
              </CS.GroupItemCardContainer>
            )}
          </Droppable>
        </DragDropContext>
      </S.GroupRegistContainer>

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
