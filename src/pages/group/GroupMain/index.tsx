import { useEffect, useState } from 'react';
import GroupSearch from '@/components/GroupSearch';
import Button from '@/components/Button';
import GroupFilter from '@/components/GroupFilter';
import GroupTripList from '@/components/GroupTripList';

import { RiFilterLine, RiFilter3Fill, RiEditFill } from 'react-icons/ri';
import * as S from './GroupMain.styles';
import { useRecoilState } from 'recoil';
import { paramsState } from '@/recoil/paramsState';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GroupListParams } from '@/apis/group';
import SearchBar from '@/components/SearchBar';

function GroupMain() {
  const navigate = useNavigate();
  const [params, setParams] = useRecoilState(paramsState);
  const [searchParams, setSearchParams] = useSearchParams(params);

  const hasDiffParams = () => {
    return Object.keys(params).some((key) => {
      const searchParamValue = searchParams.get(key);
      return searchParamValue !== params[key as keyof GroupListParams];
    });
  };

  useEffect(() => {
    if (hasDiffParams()) {
      // 초기 파라미터 변경 시(새로고침) setParams
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
    if (hasDiffParams()) {
      // 파라미터 변경 시 setSearchParams로 url 업데이트
      setSearchParams({ ...params });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const [isClickFilter, setIsClickFilter] = useState(false);
  const [isClickSort, setIsClickSort] = useState(false);

  const handleFilterModal = () => {
    setIsClickFilter(!isClickFilter);
    setIsClickSort(false);
  };

  const handleSortModal = () => {
    setIsClickSort(!isClickSort);
    setIsClickFilter(false);
  };

  const handleSearchTerm = (searchTerm: string) => {
    setParams({ ...params, title: searchTerm });
  };

  return (
    <S.GroupMainContainer>
      {/* SearchForm  */}
      <SearchBar
        onSearchTermChange={(searchTerm) => handleSearchTerm(searchTerm)}
      />

      {/* Filter */}
      <S.SearchOptionContainer>
        <div className="flex items-center gap-8">
          <S.FilterButton>
            <div
              onClick={handleFilterModal}
              className="flex items-center gap-1"
            >
              필터 <RiFilterLine />
            </div>
            {isClickFilter && <GroupFilter option={'filter'} />}
          </S.FilterButton>
          <S.FilterButton>
            <div onClick={handleSortModal} className="flex items-center gap-1">
              정렬 <RiFilter3Fill />
            </div>
            {isClickSort && <GroupFilter option={'sort'} />}
          </S.FilterButton>
        </div>
        {/* New Post */}
        <Button
          size="sm"
          type="button"
          styleType="solid"
          style={{ fontWeight: '500' }}
          className="gap-2"
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
