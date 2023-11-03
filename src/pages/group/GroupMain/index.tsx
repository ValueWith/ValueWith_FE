import { useEffect, useState } from 'react';

import GroupSearch from '@/components/GroupSearch';
import TripList from '@/components/TripList';
import Button from '@/components/Button';
import GroupFilter from '@/components/GroupFilter';

import { VscFilter } from 'react-icons/vsc';
import { PiPencilSimpleLineDuotone } from 'react-icons/pi';
import { VscListFilter } from 'react-icons/vsc';
import * as S from './GroupMain.styles';
import { useLocation, useNavigate } from 'react-router-dom';

function GroupMain() {
  const [isClickFilter, setIsClickFilter] = useState(false);
  const [isClickSort, setIsClickSort] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 새로고침 시 state 상태 유지할 수 있는 로직
  const [recruitmentStatus, setRecruitmentStatus] = useState(
    queryParams.get('recruitemStatus') || 'all'
  );
  const [sorting, setSorting] = useState(
    queryParams.get('sorting') || 'latest'
  );
  const [area, setArea] = useState(queryParams.get('area') || 'all');
  const [title, setTitle] = useState(queryParams.get('title') || '');

  // useEffect를 통해 필터 및 정렬 옵션이 변경될 때마다
  // useGroups 훅을 호출하여 데이터를 업데이트 해야 함

  useEffect(() => {
    navigate(
      `?status=${recruitmentStatus}&area=${area}&sorting=${sorting}&title=${title}`
    );
  }, [recruitmentStatus, sorting, area, title]);

  console.log(
    `recruitmentStatus=${recruitmentStatus}, sotring=${sorting}, area=${area}`
  );

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

  return (
    <S.GroupMainContainer>
      {/* SearchForm  */}
      <GroupSearch />
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
      {/* TripList */}
      <TripList pageName={'Group'} />
    </S.GroupMainContainer>
  );
}

export default GroupMain;
