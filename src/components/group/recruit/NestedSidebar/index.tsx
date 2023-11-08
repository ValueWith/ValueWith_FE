import useMapSearch from '@/hooks/useMapSearch';
import * as S from './NestedSidebar.styles';
import * as GS from '@components/group/recruit/GroupRegist.styles';
import * as SC from '@components/group/recruit/SuggestLabel/SuggestLabel.styles';

import SearchResultCard from '../GroupItemCard';
import { useEffect, useState, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import SuggestLabel from '../SuggestLabel';
import Dropdown from '@/components/Dropdown';

interface NestedSidebarStatusProps {
  status: boolean;
  type: string; // 'suggest' | 'search'
}

interface NestedSidebarProps {
  option: NestedSidebarStatusProps;
  searchTerm: string;
}

const AREA_OPTION = [
  { label: '강원', value: 'gangwon' },
  { label: '경기', value: 'gyeonggi' },
  { label: '경남', value: 'gyeongnam' },
  { label: '경북', value: 'gyeongbuk' },
  { label: '대구', value: 'daegu' },
  { label: '대전', value: 'daejeon' },
  { label: '부산', value: 'busan' },
  { label: '서울', value: 'seoul' },
  { label: '세종', value: 'sejong' },
  { label: '울산', value: 'ulsan' },
  { label: '인천', value: 'incheon' },
  { label: '전남', value: 'jeonnam' },
  { label: '전북', value: 'jeonbuk' },
  { label: '제주', value: 'jeju' },
  { label: '충남', value: 'chungnam' },
  { label: '충북', value: 'chungbuk' },
];

const AREA_OPTION_LABEL = AREA_OPTION.map((item) => item.label);

const LABELS = [
  '전체',
  '관광지',
  '음식점',
  '문화시설',
  '축제공연행사',
  '레포츠',
  '숙박',
  '쇼핑',
];

function NestedSidebar({ option, searchTerm }: NestedSidebarProps) {
  const target = useRef(null);

  const [page, setPage] = useState<number>(1);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(0);
  const [suggestionArea, setSuggestionArea] = useState<string>(
    AREA_OPTION_LABEL[7]
  );

  const { searchResult } = useMapSearch({ searchTerm, page });
  const [observe, unobserve] = useIntersectionObserver(() => {
    handlePage();
  });

  const handlePage = () => {
    setPage((page) => page + 1);
  };

  const handleSuggestions = (label: string, index: number) => {
    setSelectedLabelIndex(index);
  };

  useEffect(() => {
    const targetRef = target.current;
    if (!targetRef) return;

    if (target) {
      observe(targetRef);

      return () => {
        unobserve(targetRef);
      };
    }

    if (searchResult.length === 0) {
      unobserve(targetRef);
    }
  }, [searchResult, target]);

  useEffect(() => {
    if (option.type === 'search' && searchTerm === '')
      return console.log('검색어 없음');

    setPage(1);
  }, [searchTerm]);

  return (
    <S.NestedSidebarContainer>
      <S.NestedSidebarHeading>
        {option.type === 'suggest' ? (
          <>
            {/* 지역 드롭다운 */}
            <Dropdown
              height="42px"
              styleType="text"
              listData={AREA_OPTION_LABEL}
              selectedItem={suggestionArea}
              onSelectItem={(item) => setSuggestionArea(item)}
            />
            에서 이런 곳은 어때요?
          </>
        ) : (
          `'${searchTerm}' 검색 결과`
        )}
      </S.NestedSidebarHeading>

      {/* 추천 검색 선택 */}
      {option.type === 'suggest' && (
        <SC.SuggestionContainer>
          {LABELS.map((label, index) => (
            <SuggestLabel
              key={index}
              className={selectedLabelIndex === index ? 'selected' : ''}
              label={label}
              onClickHandler={() => handleSuggestions(label, index)}
            />
          ))}
        </SC.SuggestionContainer>
      )}

      {/* 카드 컨테이너 */}
      <GS.GroupItemCardContainer>
        {option.type === 'search' && searchResult.length !== 0 ? (
          <>
            <div>
              {searchResult.map((item: any, index: number) => (
                <SearchResultCard key={index} index={index} item={item} />
              ))}
            </div>
            {searchResult && searchResult.length > 0 && (
              <span ref={target} style={{ width: '100%', height: 30 }} />
            )}
          </>
        ) : option.type === 'search' && searchResult.length === 0 ? (
          <p>검색 결과가 없습니다 </p>
        ) : (
          '추천 데이터 '
        )}
      </GS.GroupItemCardContainer>
    </S.NestedSidebarContainer>
  );
}

export default NestedSidebar;
