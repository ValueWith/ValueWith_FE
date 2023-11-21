import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { paramsState } from '@/recoil/paramsState';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button';
import GroupFilter from '@/components/group/list/GroupFilter';
import GroupTripList from '@/components/group/list/GroupTripList';
import SearchBar from '@/components/SearchBar';

import { GroupListParams } from '@/apis/group';

import { RiFilterLine, RiFilter3Fill, RiEditFill } from 'react-icons/ri';
import * as S from './GroupMain.styles';

function GroupMain() {
  const navigate = useNavigate();
  const [params, setParams] = useRecoilState(paramsState);
  const [searchParams, setSearchParams] = useSearchParams();

  const hasDiffParams = (
    params: GroupListParams,
    searchParams: URLSearchParams
  ) => {
    return Object.keys(params).some((key) => {
      const searchParamValue = searchParams.get(key);
      return searchParamValue !== params[key as keyof GroupListParams];
    });
  };

  // 초기 로딩 시, URL 파라미터를 상태에 적용
  useEffect(() => {
    if (hasDiffParams(params, searchParams)) {
      setParams({
        page: searchParams.get('page') || params.page,
        status: searchParams.get('status') || params.status,
        area: searchParams.get('area') || params.area,
        sort: searchParams.get('sort') || params.sort,
        title: searchParams.get('title') || params.title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // URL 파라미터가 변경될 때마다 URL을 업데이트
    setSearchParams({ ...params });

    const handlePopstate = () => {
      // 브라우저의 뒤로 가기/앞으로 가기 버튼을 처리하는 함수
      const newSearchParams = new URLSearchParams(window.location.search);
      if (hasDiffParams(params, newSearchParams)) {
        setParams({
          page: newSearchParams.get('page') || params.page,
          status: newSearchParams.get('status') || params.status,
          area: newSearchParams.get('area') || params.area,
          sort: newSearchParams.get('sort') || params.sort,
          title: newSearchParams.get('title') || params.title,
        });
      }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const [isClickFilter, setIsClickFilter] = useState(false);
  const [isClickSort, setIsClickSort] = useState(false);

  const handleSearchTerm = (searchTerm: string) => {
    setParams({ ...params, title: searchTerm, page: '1' });
  };

  return (
    <S.GroupMainContainer>
      {/* SearchForm  */}
      <SearchBar
        onSearchTermChange={(searchTerm) => handleSearchTerm(searchTerm)}
        defaultValue={params.title}
      />

      {/* Filter */}
      <S.SearchOptionContainer className='mt-[20px]'>
        <div className='flex items-center gap-8'>
          <S.FilterButton>
            <div
              onClick={() => setIsClickFilter(true)}
              className='flex items-center gap-1'
            >
              필터 <RiFilterLine />
            </div>
            {isClickFilter && (
              <GroupFilter
                option={'filter'}
                onClose={() => setIsClickFilter(false)}
              />
            )}
          </S.FilterButton>
          <S.FilterButton>
            <div
              onClick={() => setIsClickSort(true)}
              className='flex items-center gap-1'
            >
              정렬 <RiFilter3Fill />
            </div>
            {isClickSort && (
              <GroupFilter
                option={'sort'}
                onClose={() => setIsClickSort(false)}
              />
            )}
          </S.FilterButton>
        </div>
        {/* New Post */}
        <Button
          size='sm'
          type='button'
          styleType='solid'
          style={{ fontWeight: '500' }}
          className='gap-2'
          onClickHandler={() => {
            navigate('/group/recruit');
          }}
        >
          <RiEditFill />
          모집글 작성하기
        </Button>
      </S.SearchOptionContainer>
      <GroupTripList />
    </S.GroupMainContainer>
  );
}

export default GroupMain;
