import { useEffect, useState } from 'react';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { useRecoilState } from 'recoil';
import { selectedPlaceState } from '@/recoil/GroupRegistState';

import { useRecommendRoute } from '@/hooks/useRegist';

import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import NestedSidebar from '../NestedSidebar';
import GroupItemCard from '../GroupItemCard';
import NoResult from '../NoResult';

import * as S from '@components/group/recruit/GroupRegist.styles';
import * as CS from '@components/group/recruit/GroupRegist.styles';
import Loader from '@/components/Loader';

function GroupRegistSchedule({
  onSelectedStep,
}: {
  onSelectedStep: (step: number) => void;
}) {
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isNestedSidebar, setIsNestedSidebar] = useState({
    status: false,
    type: 'search', // 'suggest' | 'search'
  });

  const { handleRecommendRoute, isLoading } = useRecommendRoute();

  const onDragEnd = (result: any) => {
    // 리스트 밖으로 드래그한 경우
    if (!result.destination) return;

    const reorderedData = Array.from(selectedPlace.selectedPlace);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);
    setSelectedPlace({ selectedPlace: reorderedData });
  };

  const handleSearchTerm = async (term: string, type: 'suggest' | 'search') => {
    setIsNestedSidebar({
      type: type,
      status: true,
    });

    setSearchTerm(term);
  };

  return (
    <div
      className="relative h-full flex flex-col"
      style={{
        pointerEvents: isLoading ? 'none' : 'auto',
      }}
    >
      <S.GroupRegistContainer>
        {/* 검색창 */}
        <div className="registGroup">
          <SearchBar
            onSearchTermChange={(searchTerm) =>
              handleSearchTerm(searchTerm, 'search')
            }
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
            onClickHandler={() => handleSearchTerm(searchTerm, 'suggest')}
          >
            장소 추천 받기
          </Button>
        </div>

        {selectedPlace.selectedPlace.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="one">
              {(provided) => (
                <CS.GroupItemCardContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <>
                    {selectedPlace.selectedPlace.map(
                      (item: any, index: any) => (
                        <GroupItemCard
                          key={`${index}-${item.id}`}
                          item={item}
                          index={index}
                          type={'registed'}
                        />
                      )
                    )}
                  </>
                  {provided.placeholder}
                </CS.GroupItemCardContainer>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <NoResult>
            등록한 일정이 없어요
            <br />
            Tweaver에 일정을 등록하고 함께할 사람을 찾아보세요!
          </NoResult>
        )}
      </S.GroupRegistContainer>

      <div
        className="flex flex-col mt-auto pt-10 pb-12 px-[24px]"
        style={{
          borderRight: '1px solid #e3e3e3',
        }}
      >
        <Button
          type="button"
          styleType={
            selectedPlace.selectedPlace.length !== 0
              ? 'outline'
              : 'outline-disabled'
          }
          fullWidth
          style={{
            marginBottom: '8px',
          }}
          onClickHandler={() =>
            handleRecommendRoute(selectedPlace.selectedPlace)
          }
        >
          최적경로 추천받기
        </Button>
        <Button
          styleType={
            selectedPlace.selectedPlace.length !== 0 ? 'solid' : 'disabled'
          }
          type="button"
          fullWidth
          onClickHandler={() => onSelectedStep(2)}
        >
          다음
        </Button>
      </div>

      {isLoading && <Loader />}

      {/* 추천 / 검색 사이드바 2depth */}
      {isNestedSidebar.status === true && (
        <NestedSidebar option={isNestedSidebar} searchTerm={searchTerm} />
      )}
    </div>
  );
}

export default GroupRegistSchedule;
