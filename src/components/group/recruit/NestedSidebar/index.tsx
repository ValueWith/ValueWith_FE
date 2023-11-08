import useMapSearch from '@/hooks/useMapSearch';
import * as S from './NestedSidebar.styles';
import * as GS from '@components/group/recruit/GroupRegist.styles';
import * as SC from '@components/group/recruit/SuggestLabel/SuggestLabel.styles';

import SearchResultCard from '../GroupItemCard';
import { useEffect, useState, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import SuggestLabel from '../SuggestLabel';

interface NestedSidebarStatusProps {
  status: boolean;
  type: string; // 'suggest' | 'search'
}

interface NestedSidebarProps {
  option: NestedSidebarStatusProps;
  searchTerm: string;
}

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
        {option.type === 'suggest'
          ? '이런 곳은 어때요?'
          : `'${searchTerm}' 검색 결과`}
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
