import { Draggable } from '@hello-pangea/dnd';

import { useRecoilState } from 'recoil';
import { mapOptionState, selectedPlaceState } from '@/recoil/GroupRegistState';

import { findLabelByCode } from '@/utils/findCodeByLabel';
import { CATEGORY_OPTION } from '@/constants/area';

import { RiFlag2Line, RiFlag2Fill, RiDraggable } from 'react-icons/ri';
import Button from '@/components/Button';
import * as S from './GroupItemCard.styles';
import theme from '@/assets/styles/theme';

interface GroupItemCardProps {
  item: any;
  index: number;
  type?: 'registed' | 'search' | 'suggest';
}

function GroupItemCard({ item, index, type = 'search' }: GroupItemCardProps) {
  const isSearchType = type === 'search' || type === 'suggest';
  const key = isSearchType ? `search-${index}` : `registed-${index}`;
  const suggestCategory = findLabelByCode(
    'category',
    Number(item.contenttypeid),
    CATEGORY_OPTION
  );

  const categoryText =
    item.category_group_name || item.category || suggestCategory || '기타';

  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
  const [mapOption, setMapOption] = useRecoilState(mapOptionState);

  function getOrderClassName(categoryText: string) {
    if (categoryText.includes('숙박')) {
      return 'hotel';
    } else if (
      categoryText.includes('음식점') ||
      categoryText.includes('카페') ||
      categoryText.includes('식당')
    ) {
      return 'food';
    } else if (
      categoryText.includes('관광') ||
      categoryText.includes('문화') ||
      categoryText.includes('역사') ||
      categoryText.includes('행사')
    ) {
      return 'attraction';
    } else {
      return '';
    }
  }

  const handleMapCenter = () => {
    setMapOption({
      ...mapOption,
      center: { lat: item.y || item.mapy, lng: item.x || item.mapx },
    });
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
      placeCode: item.id || item.contentid,
      name: item.place_name || item.title,
      address: item.address_name || item.addr1,
      category: categoryText,
      x: item.x || item.mapx,
      y: item.y || item.mapy,
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

  const cardInfo = (
    <S.GroupItemCardInfo>
      <S.GroupItemCardHeading>
        {item.place_name || item.name || item.title}
      </S.GroupItemCardHeading>
      <S.SearchResultDetailInfo>
        <S.GroupItemCardCategory>
          {categoryText}&nbsp;·&nbsp;
        </S.GroupItemCardCategory>
        <S.GroupItemCardAddress>
          {item.address_name || item.address || item.addr1}
        </S.GroupItemCardAddress>
      </S.SearchResultDetailInfo>
    </S.GroupItemCardInfo>
  );

  return (
    <>
      {isSearchType ? (
        <S.GroupItemCard key={key} className="search" onClick={handleMapCenter}>
          {cardInfo}
          <Button
            type="button"
            styleType="text"
            style={{ minWidth: 'auto' }}
            onClickHandler={() => handleRegistrationCard(event, item)}
          >
            추가
          </Button>
        </S.GroupItemCard>
      ) : (
        <Draggable draggableId={`${index}-${item.id}`} index={index}>
          {(provided) => (
            <S.GroupItemCard
              key={key}
              className="registed"
              onClick={handleMapCenter}
              ref={provided.innerRef}
              {...provided.draggableProps}
              // {...provided.dragHandleProps}
            >
              <span className="handle" {...provided.dragHandleProps}>
                <RiDraggable
                  style={{ cursor: 'grab', minWidth: '18px', height: '18px' }}
                />
              </span>

              {type === 'registed' && (
                <S.GroupItemCardOrder
                  className={getOrderClassName(categoryText)}
                >
                  {index + 1}
                </S.GroupItemCardOrder>
              )}

              {cardInfo}

              <Button
                type="button"
                styleType="text"
                style={{ minWidth: 'auto', fontSize: '13px', color: '#FF0000' }}
                onClickHandler={() => handleCancelRegistration(event, item)}
              >
                일정 제거
              </Button>
              {type === 'registed' && (
                <>
                  {index === 0 ? (
                    <S.SetDepartureButton
                      type="button"
                      style={{
                        backgroundColor: theme.color.primary,
                      }}
                      onClick={handleDeparture}
                    >
                      <RiFlag2Fill fill="#fff" size={14} />
                    </S.SetDepartureButton>
                  ) : (
                    <S.SetDepartureButton
                      type="button"
                      onClick={handleDeparture}
                    >
                      <RiFlag2Line fill="#c6c6c6" size={16} />
                    </S.SetDepartureButton>
                  )}
                </>
              )}
            </S.GroupItemCard>
          )}
        </Draggable>
      )}
    </>
  );
}

export default GroupItemCard;
