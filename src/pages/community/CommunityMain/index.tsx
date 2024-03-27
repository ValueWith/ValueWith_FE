import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { paramsState } from '@/recoil/paramsState';

import { AREA_OPTIONS } from '@/constants/filterOption';

import { RiEditFill } from 'react-icons/ri';
import Button from '@/components/common/Button';
import RadioGroup from '@/components/common/RadioGroup';
import SearchBar from '@/components/common/SearchBar';

import * as S from './CommunityMain.styles';

function CommunityMain() {
  const [params, setParams] = useRecoilState(paramsState);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchTerm = (searchTerm: string) => {
    setParams({ ...params, title: searchTerm, page: '1' });
  };

  const handleAreaChange = (value: string) => {
    setParams({ ...params, area: value, page: '1' });
  };

  useEffect(() => {
    console.log('params', params);
    console.log('searchParams', searchParams);
  }, [params, searchParams]);

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
      <S.communityCotentContainer></S.communityCotentContainer>
    </S.CommunityMainContainer>
  );
}

export default CommunityMain;
