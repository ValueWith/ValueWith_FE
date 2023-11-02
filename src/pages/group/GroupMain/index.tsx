import { useState } from 'react';

import GroupSearch from '@/components/GroupSearch';
import TripList from '@/components/TripList';
import Button from '@/components/Button';
import GroupFilter from '@/components/GroupFilter';

import { VscFilter } from 'react-icons/vsc';
import { PiPencilSimpleLineDuotone } from 'react-icons/pi';
import { VscListFilter } from 'react-icons/vsc';
import * as S from './GroupMain.styles';

function GroupMain() {
  const [isClickFilter, setIsClickFilter] = useState(false);
  const [isClickSort, setIsClickSort] = useState(false);

  const [recruitmentStatus, setRecruitmentStatus] = useState('all');
  const [sorting, setSorting] = useState('latest');
  const [area, setArea] = useState('all');

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
