import { useEffect, useRef } from 'react';

import { selectedPlaceState } from '@/state/GroupRegistState';
import { useRecoilState } from 'recoil';

import Button from '@/components/Button';
import * as S from './GroupItemCard.styles';

interface GroupItemCardProps {
  key: number;
  item: any;
}

function GroupItemCard({ key, item }: GroupItemCardProps) {
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);

  const handleSelectCard = (event: any, item: any) => {
    event.stopPropagation();

    const selectedData = {
      placeCode: item.id,
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
        prevSelectedPlace.selectedPlace.map((item) => item.placeCode)
      );

      // 이미 선택된 장소에 있다면 early return
      if (uniqueSelectedIds.has(selectedData.placeCode)) {
        return prevSelectedPlace;
      }

      return {
        selectedPlace: [...prevSelectedPlace.selectedPlace, selectedData],
      };
    });
  };

  console.log(item);

  return (
    <S.GroupItemCard
      key={key}
      onClick={() => {
        console.log('위경도');
      }}
    >
      {/* 카드 정보 */}
      <S.GroupItemCardInfo>
        <S.GroupItemCardHeading>{item.place_name}</S.GroupItemCardHeading>
        <S.SearchResultDetailInfo>
          <S.GroupItemCardCategory>
            {item.category_group_name ? item.category_group_name : '기타'}
          </S.GroupItemCardCategory>
          &nbsp;&#183;&nbsp;
          <S.GroupItemCardAddress>{item.address_name}</S.GroupItemCardAddress>
        </S.SearchResultDetailInfo>
      </S.GroupItemCardInfo>

      {/* 추가 버튼 */}
      <Button
        type="button"
        styleType="text"
        style={{ minWidth: 'auto' }}
        onClickHandler={() => handleSelectCard(event, item)}
      >
        추가
      </Button>
    </S.GroupItemCard>
  );
}

export default GroupItemCard;
