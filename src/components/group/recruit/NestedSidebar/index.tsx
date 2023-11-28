import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  AREA_OPTION,
  AREA_OPTION_LABEL,
  CATEGORY_OPTION,
  CATEGORY_LABEL,
} from '@/constants/area';

import useMapSearch from '@/hooks/useMapSearch';
import { useGetSuggestionData } from '@/hooks/useRegist';
import { findCodeByLabel } from '@/utils/findCodeByLabel';

import SearchResultCard from '../GroupItemCard';
import SuggestLabel from '../SuggestLabel';
import Dropdown from '@/components/common/Dropdown';
import Loader from '@/components/common/Loader';
import NoResult from '../NoResult';

import theme from '@/assets/styles/theme';
import { MdOutlineClose } from 'react-icons/md';

import * as S from './NestedSidebar.styles';
import * as GS from '@components/group/recruit/GroupRegist.styles';
import * as SC from '@components/group/recruit/SuggestLabel/SuggestLabel.styles';

interface NestedSidebarStatusProps {
  status: boolean;
  type: string; // 'suggest' | 'search'
}

interface NestedSidebarProps {
  option: NestedSidebarStatusProps;
  setOption: any;
  searchTerm: string;
}

function NestedSidebar({ option, setOption, searchTerm }: NestedSidebarProps) {
  const [page, setPage] = useState<number>(1);
  const [suggestionPage, setSuggestionPage] = useState<number>(1);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(0);
  const [suggestionArea, setSuggestionArea] = useState('서울');
  const [category, setCategory] = useState('전체');

  const { ref } = useInView({
    threshold: 0.5, // 가시성이 50% 이상일 때 트리거
    onChange: (inView) => {
      if (inView) {
        handlePage();
      }
    },
  });

  const { searchResult, isLast } = useMapSearch({ searchTerm, page });
  const { isTourLoading, isTourError, isTourSuccess, suggestionData } =
    useGetSuggestionData({
      page: suggestionPage,
      areaCode: findCodeByLabel('area', suggestionArea, AREA_OPTION),
      categoryCode: findCodeByLabel('category', category, CATEGORY_OPTION),
    });

  const handlePage = () => {
    if (option.type === 'search') {
      setPage((page) => page + 1);
    } else {
      setSuggestionPage((page) => page + 1);
    }
  };

  // 카테고리 선택 시, 라벨 인덱스 변경 및 카테고리 변경
  const handleSuggestions = async (category: string, index: number) => {
    setSelectedLabelIndex(index);
    setCategory(category);
  };

  // 추천 사이드바에서 지역이 바뀔 때, 카테고리가 바뀔 때마다 데이터 요청
  useEffect(() => {
    setSuggestionPage(1);
    handleSuggestions(category, selectedLabelIndex);
  }, [category, suggestionArea]);

  // 검색어가 바뀌거나, 추천 사이드바에서 지역이 바뀔 때 페이지 초기화
  useEffect(() => {
    setPage(1);
    setSuggestionPage(1);
  }, [searchTerm, option.type]);

  return (
    <S.NestedSidebarContainer>
      {/* 닫기 버튼 */}
      <S.NestedSidebarCloseButton onClick={setOption}>
        <MdOutlineClose className="closeIcon" />
      </S.NestedSidebarCloseButton>

      {/* 검색 및 데이터 결과 */}
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
          <NoResult>
            검색 결과가 없어요
            <br />
            다른 키워드로 검색해보세요
          </NoResult>
        ) : (
          <div>
            {option.type === 'search' ? (
              <>
                {/* 카카오맵 검색 결과  */}
                {searchResult.map((item: any, index: number) => (
                  <SearchResultCard key={index} index={index} item={item} />
                ))}

                {isLast && (
                  <p
                    className="text-center my-6"
                    style={{
                      color: `${theme.color.gray600}`,
                    }}
                  >
                    마지막 페이지입니다.
                  </p>
                )}

                {searchResult && searchResult.length > 0 && (
                  <span ref={ref} style={{ width: '100%', height: 30 }} />
                )}
              </>
            ) : (
              <>
                {/* 장소추천 검색 결과  */}
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
