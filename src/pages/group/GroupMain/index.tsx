import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { GroupListParams } from '@/apis/group';
import useGroupDataFetching from '@/hooks/useGroup';

import GroupSearch from '@/components/GroupSearch';
import TripList from '@/components/TripList';
import Button from '@/components/Button';
import GroupFilter from '@/components/GroupFilter';

import { VscFilter } from 'react-icons/vsc';
import { PiPencilSimpleLineDuotone } from 'react-icons/pi';
import { VscListFilter } from 'react-icons/vsc';
import * as S from './GroupMain.styles';

interface PageChangeCallback {
  selected: number;
}

function GroupMain() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isClickFilter, setIsClickFilter] = useState(false);
  const [isClickSort, setIsClickSort] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );
  const [recruitmentStatus, setRecruitmentStatus] = useState(
    searchParams.get('recruitemStatus') || 'all'
  );
  const [sorting, setSorting] = useState(
    searchParams.get('sorting') || 'latest'
  );
  const [area, setArea] = useState(searchParams.get('area') || 'all');
  const [title, setTitle] = useState(searchParams.get('title') || '');

  const params: GroupListParams = {
    page: String(currentPage),
    status: recruitmentStatus,
    area: area,
    sorting: sorting,
    title: title,
  };

  useEffect(() => {
    setSearchParams({ ...params });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, recruitmentStatus, area, sorting, title]);

  const { data, isLoading, isError } = useGroupDataFetching(params);

  const groupData = data?.tripGroups;

  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleFilter = () => {
    setIsClickFilter(!isClickFilter);
    setIsClickSort(false);
  };

  const handleSort = () => {
    setIsClickSort(!isClickSort);
    setIsClickFilter(false);
  };

  const handleNewPost = () => {
    console.log('모집글 작성하기 페이지 이동');
  };

  const handlePageClick = (data: PageChangeCallback) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage + 1);
  };

  return (
    <S.GroupMainContainer>
      {/* SearchForm  */}
      <GroupSearch title={title} setTitle={setTitle} />
      {/* Filter */}
      <S.SearchOptionContainer>
        <div className='flex items-center gap-8'>
          <S.FilterButton>
            <div onClick={handleFilter} className='flex items-center gap-2'>
              필터 <VscFilter />
            </div>
            {isClickFilter && (
              <GroupFilter
                option={'filter'}
                recruitmentStatus={recruitmentStatus}
                setRecruitmentStatus={setRecruitmentStatus}
                sorting={sorting}
                setSorting={setSorting}
                area={area}
                setArea={setArea}
              />
            )}
          </S.FilterButton>
          <S.FilterButton>
            <div onClick={handleSort} className='flex items-center gap-2'>
              정렬 <VscListFilter />
            </div>
            {isClickSort && (
              <GroupFilter
                option={'sort'}
                recruitmentStatus={recruitmentStatus}
                setRecruitmentStatus={setRecruitmentStatus}
                sorting={sorting}
                setSorting={setSorting}
                area={area}
                setArea={setArea}
              />
            )}
          </S.FilterButton>
        </div>
        {/* New Post */}
        <Button
          type='button'
          styleType='solid'
          className='flex gap-2'
          onClickHandler={handleNewPost}
        >
          <PiPencilSimpleLineDuotone />
          모집글 작성하기
        </Button>
      </S.SearchOptionContainer>
      {/* Data Loading... */}
      {isLoading && <div>Loading...</div>}
      {/* Pagination & TripList */}
      {groupData && (
        <>
          <TripList groupData={groupData} />
          <S.PaginationContainer>
            <ReactPaginate
              previousLabel={'<'}
              previousClassName={'previous'}
              nextLabel={'>'}
              nextClassName={'next'}
              breakLabel={'...'}
              pageCount={data?.totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              renderOnZeroPageCount={null}
              initialPage={currentPage - 1}
            />
          </S.PaginationContainer>
        </>
      )}
    </S.GroupMainContainer>
  );
}

export default GroupMain;
