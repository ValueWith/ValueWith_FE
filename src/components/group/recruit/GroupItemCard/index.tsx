import { mapOptionState, selectedPlaceState } from '@/state/GroupRegistState';
import { useRecoilState } from 'recoil';

import { RiFlag2Line, RiFlag2Fill } from 'react-icons/ri';
import Button from '@/components/Button';
import * as S from './GroupItemCard.styles';
import theme from '@/assets/styles/theme';
import { forwardRef } from 'react';

interface GroupItemCardProps {
  item: any;
  index: number;
  type?: 'registed' | 'search';
}

function GroupItemCard({ item, index, type = 'search' }: GroupItemCardProps) {
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
  const [mapOption, setMapOption] = useRecoilState(mapOptionState);

  const handleMapCenter = () => {
    setMapOption({
      ...mapOption,
      center: { lat: item.y, lng: item.x },
    });
  };
  const handleSelectCard = () => {
    if (type === 'search') {
      // 카드 클릭 시, 해당 장소로 지도 이동
      handleMapCenter();
    } else {
      console.log('선택된 카드');
    }
  };

  const handleDeparture = (event: any) => {
    event.stopPropagation();

    // 선택한 아이템을 배열의 맨 앞으로 이동
    setSelectedPlace((prevSelectedPlace) => {
      const selectedPlace = [...prevSelectedPlace.selectedPlace];
      const selectedItem = selectedPlace.splice(index, 1)[0];
      selectedPlace.unshift(selectedItem);

      return {
        selectedPlace,
      };
    });

    handleMapCenter();
  };

  const handleCancelRegistration = (event: any, item: any) => {
    event.stopPropagation();

    // 해당 카드를 제외하고 선택된 장소 배열을 다시 생성
    setSelectedPlace((prevSelectedPlace) => {
      return {
        selectedPlace: prevSelectedPlace.selectedPlace.filter(
          (selectedItem) => selectedItem.placeCode !== item.placeCode
        ),
      };
    });
  };

  const handleRegistrationCard = (event: any, item: any) => {
    event.stopPropagation();

    const selectedData = {
      placeCode: item.id,
      name: item.place_name,
      address: item.address_name,
      category: item.category_group_name,
      x: item.x,
      y: item.y,
    };

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

  return (
    <S.GroupItemCard
      key={type === 'search' ? `search-${index}` : `registed-${index}`}
      className={type === 'search' ? 'search' : 'registed'}
      onClick={handleSelectCard}
    >
      {/* 카드 순서 */}
      {type === 'registed' && (
        <S.GroupItemCardOrder>{index + 1}</S.GroupItemCardOrder>
      )}

      {/* 카드 정보 */}
      <S.GroupItemCardInfo>
        <S.GroupItemCardHeading>
          {item.place_name || item.name}
        </S.GroupItemCardHeading>
        <S.SearchResultDetailInfo>
          <S.GroupItemCardCategory>
            {item.category_group_name
              ? item.category_group_name
              : item.category
              ? item.category
              : '기타'}
          </S.GroupItemCardCategory>
          &nbsp;&#183;&nbsp;
          <S.GroupItemCardAddress>
            {item.address_name || item.address}
          </S.GroupItemCardAddress>
        </S.SearchResultDetailInfo>
      </S.GroupItemCardInfo>

      {/* 추가 혹은 제거 버튼 */}
      {type === 'search' ? (
        <Button
          type="button"
          styleType="text"
          style={{ minWidth: 'auto' }}
          onClickHandler={() => handleRegistrationCard(event, item)}
        >
          추가
        </Button>
      ) : (
        <Button
          type="button"
          styleType="text"
          style={{ minWidth: 'auto', fontSize: '13px', color: '#FF0000' }}
          onClickHandler={() => handleCancelRegistration(event, item)}
        >
          일정 제거
        </Button>
      )}

      {/* 출발지 지정 버튼 */}
      {type === 'registed' && (
        <>
          {index === 0 ? (
            <S.SetDepartureButton
              type="button"
              style={{
                backgroundColor: `${theme.color.primary}`,
              }}
              onClick={handleDeparture}
            >
              <RiFlag2Fill fill="#fff" size={14} />
            </S.SetDepartureButton>
          ) : (
            <S.SetDepartureButton type="button" onClick={handleDeparture}>
              <RiFlag2Line fill="#c6c6c6" size={16} />
            </S.SetDepartureButton>
          )}
        </>
      )}
    </S.GroupItemCard>
  );
}

export default forwardRef(GroupItemCard);
