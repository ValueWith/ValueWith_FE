import { useEffect, useRef } from 'react';

import { selectedPlaceState } from '@/state/GroupRegistState';
import { useRecoilState } from 'recoil';

import Button from '@/components/Button';
import * as S from './SearchResultCard.styles';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface SearchResultCardProps {
  data: unknown[];
  handlePage: () => void;
}

function SearchResultCard({ data, handlePage }: SearchResultCardProps) {
  const target = useRef(null);

  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
  const [observe, unobserve] = useIntersectionObserver(() => {
    handlePage();
  });

  useEffect(() => {
    const targetRef = target.current;
    if (!targetRef) return;

    if (target) {
      observe(targetRef);

      return () => {
        unobserve(targetRef);
      };
    }

    if (data.length === 0) {
      unobserve(targetRef);
    }
  }, [data, target]);

  const handleSelectCard = (event: any, item: any) => {
    event.stopPropagation();

    const selectedData = {
      id: item.id,
      name: item.place_name,
      address: item.address_name,
      category: item.category_group_name,
      x: item.x,
      y: item.y,
    };

    console.log(selectedData, 'selectedData');

    // 선택한 장소가 이미 선택된 장소에 있는지 확인
    setSelectedPlace((prevSelectedPlace) => {
      const uniqueSelectedIds = new Set(
        prevSelectedPlace.selectedPlace.map((item) => item.id)
      );

      // 이미 선택된 장소에 있다면 early return
      if (uniqueSelectedIds.has(selectedData.id)) {
        return prevSelectedPlace;
      }

      return {
        selectedPlace: [...prevSelectedPlace.selectedPlace, selectedData],
      };
    });
  };

  console.log(selectedPlace);

  return (
    <S.SearchResultCardContainer>
      <ul>
        {data.map((item: any, index: number) => (
          <S.SearchResultCard
            key={index}
            onClick={() => {
              console.log('위경도');
            }}
          >
            {/* 카드 정보 */}
            <S.SearchResultCardInfo>
              <S.SearchResultCardHeading>
                {item.place_name}
              </S.SearchResultCardHeading>
              <S.SearchResultDetailInfo>
                <S.SearchResultCardCategory>
                  {item.category_group_name ? item.category_group_name : '기타'}
                </S.SearchResultCardCategory>
                &nbsp;&#183;&nbsp;
                <S.SearchResultCardAddress>
                  {item.address_name}
                </S.SearchResultCardAddress>
              </S.SearchResultDetailInfo>
            </S.SearchResultCardInfo>

            {/* 추가 버튼 */}
            <Button
              type="button"
              styleType="text"
              style={{ minWidth: 'auto' }}
              onClickHandler={() => handleSelectCard(event, item)}
            >
              추가
            </Button>
          </S.SearchResultCard>
        ))}
      </ul>
      {data && data.length > 0 && (
        <span ref={target} style={{ width: '100%', height: 30 }} />
      )}
    </S.SearchResultCardContainer>
  );
}

export default SearchResultCard;
