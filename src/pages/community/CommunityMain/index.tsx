import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { communityParamsState } from '@/recoil/paramsState';

import { AREA_OPTIONS } from '@/constants/filterOption';

import { RiEditFill } from 'react-icons/ri';
import Button from '@/components/common/Button';
import RadioGroup from '@/components/common/RadioGroup';
import SearchBar from '@/components/common/SearchBar';

import * as S from './CommunityMain.styles';
import { CommunityListParams } from '@/apis/community';
import CommunityCard from '@/components/community/CommunityCard';

function CommunityMain() {
  const [params, setParams] = useRecoilState(communityParamsState);
  const [searchParams, setSearchParams] = useSearchParams();

  const hasDiffParams = (
    params: CommunityListParams,
    searchParams: URLSearchParams
  ) => {
    return Object.keys(params).some((key) => {
      const searchParamValue = searchParams.get(key);
      return searchParamValue !== params[key as keyof CommunityListParams];
    });
  };

  const handleSearchTerm = (searchTerm: string) => {
    setParams({ ...params, title: searchTerm, page: '1' });
  };

  const handleAreaChange = (value: string) => {
    setParams({ ...params, area: value, page: '1' });
  };

  useEffect(() => {
    if (hasDiffParams(params, searchParams)) {
      setParams({
        ...params,
        page: searchParams.get('page') || params.page,
        area: searchParams.get('area') || params.area,
        title: searchParams.get('title') || params.title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchParams({ ...params });
  }, [params]);

  return (
    <S.CommunityMainContainer>
      {/* 커뮤니티 헤딩 */}
      <S.CommunityMainHeader>
        {/* 검색창 */}
        <SearchBar
          onSearchTermChange={(searchTerm) => handleSearchTerm(searchTerm)}
          defaultValue={params.title}
        />

        {/* 지역 필터 */}
        <S.FilterContainer>
          <S.CommunityMainHeaderTitle>
            지역별 후기 찾기
          </S.CommunityMainHeaderTitle>
          <RadioGroup
            options={AREA_OPTIONS}
            selectedValue={params.area}
            styleType="round"
            onChange={handleAreaChange}
          />
        </S.FilterContainer>

        {/* 글 작성 버튼 */}
        <Button
          type="button"
          styleType="solid"
          style={{ fontWeight: '500', minWidth: '196px' }}
          onClickHandler={() => {
            console.log('글 작성 페이지로 이동');
          }}
        >
          <RiEditFill />
          &nbsp; 후기 작성하기
        </Button>
      </S.CommunityMainHeader>

      {/* 커뮤니티 컨텐츠 */}
      <S.communityCotentContainer>
        <CommunityCard />
      </S.communityCotentContainer>
    </S.CommunityMainContainer>
  );
}

export default CommunityMain;
