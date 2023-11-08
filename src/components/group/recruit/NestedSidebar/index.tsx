import { useEffect, useState, useRef } from 'react';

import {
  AREA_OPTION,
  AREA_OPTION_LABEL,
  CATEGORY_OPTION,
  CATEGORY_LABEL,
} from '@/constants/area';
import useMapSearch from '@/hooks/useMapSearch';
import { useInView } from 'react-intersection-observer';

import { useGetSuggestionData } from '@/hooks/useRegist';

import SearchResultCard from '../GroupItemCard';
import SuggestLabel from '../SuggestLabel';
import Dropdown from '@/components/Dropdown';

import * as S from './NestedSidebar.styles';
import * as GS from '@components/group/recruit/GroupRegist.styles';
import * as SC from '@components/group/recruit/SuggestLabel/SuggestLabel.styles';
import Loader from '@/components/Loader';

interface NestedSidebarStatusProps {
  status: boolean;
  type: string; // 'suggest' | 'search'
}

interface NestedSidebarProps {
  option: NestedSidebarStatusProps;
  searchTerm: string;
}

const findCodeByLabel = (type: 'area' | 'category', label: string) => {
  if (type === 'area') {
    const area = AREA_OPTION.find((item) => item.label === label);
    return area ? area.code : null;
  } else {
    const category = CATEGORY_OPTION.find((item) => item.label === label);
    return category ? category.code : null;
  }
};

function NestedSidebar({ option, searchTerm }: NestedSidebarProps) {
  const [page, setPage] = useState<number>(1);
  const [suggestionPage, setSuggestionPage] = useState<number>(1);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(0);
  const [suggestionArea, setSuggestionArea] = useState('서울');
  const [category, setCategory] = useState('전체');

  const [ref, inView] = useInView({
    threshold: 0.5, // 가시성이 50% 이상일 때 트리거
    onChange: (inView) => {
      if (inView) {
        handlePage();
      }
    },
  });

  const { searchResult } = useMapSearch({ searchTerm, page });
  const { isTourLoading, isTourError, isTourSuccess, suggestionData } =
    useGetSuggestionData({
      type: option.type,
      page: suggestionPage,
      areaCode: findCodeByLabel('area', suggestionArea),
      categoryCode: findCodeByLabel('category', category),
    });

  const handlePage = () => {
    if (option.type === 'search') {
      setPage((page) => page + 1);
    } else {
      setSuggestionPage((page) => page + 1);
    }
  };

  const handleSuggestions = async (category: string, index: number) => {
    setSelectedLabelIndex(index);
    setCategory(category);
  };

  // 추천 사이드바에서 지역이 바뀔 때, 카테고리가 바뀔 때마다 데이터 요청
  useEffect(() => {
    handleSuggestions(category, selectedLabelIndex);
  }, [category, suggestionArea]);

  useEffect(() => {
    if (option.type === 'search') {
      setSuggestionPage(1);
    } else {
      setPage(1);
    }
  }, [option.type]);

  useEffect(() => {
    // 카테고리랑 지역이 바뀔 때마다 페이지를 1로 초기화
    setSuggestionPage(1);
  }, [category, suggestionArea]);

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
          {CATEGORY_OPTION.map((category, index) => (
            <SuggestLabel
              key={index}
              className={selectedLabelIndex === index ? 'selected' : ''}
              label={category.label}
              onClickHandler={() => handleSuggestions(category.label, index)}
            />
          ))}
        </SC.SuggestionContainer>
      )}

      {/* 카드 컨테이너 */}
      <GS.GroupItemCardContainer>
        {option.type === 'search' && searchResult.length === 0 ? (
          <p>검색 결과가 없습니다</p>
        ) : option.type === 'suggest' && suggestionData.length === 0 ? (
          <p>검색 결과가 없습니다</p>
        ) : (
          <div>
            {option.type === 'search' ? (
              <>
                {searchResult.map((item: any, index: number) => (
                  <SearchResultCard key={index} index={index} item={item} />
                ))}
                {searchResult && searchResult.length > 0 && (
                  <span ref={ref} style={{ width: '100%', height: 30 }} />
                )}
              </>
            ) : (
              <>
                {suggestionData.map((item: any, index: number) => (
                  <SearchResultCard
                    key={index}
                    type={'suggest'}
                    index={index}
                    item={item}
                  />
                ))}
                {suggestionData && suggestionData.length > 0 && (
                  <span ref={ref} style={{ width: '100%', height: 30 }} />
                )}
              </>
            )}
            {option.type === 'suggest' && isTourLoading && <Loader />}
          </div>
        )}
      </GS.GroupItemCardContainer>
    </S.NestedSidebarContainer>
  );
}

export default NestedSidebar;
