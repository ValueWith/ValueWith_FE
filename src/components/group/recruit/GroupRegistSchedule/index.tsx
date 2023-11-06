import { useEffect, useState } from 'react';

import NestedSidebar from '../NestedSidebar';

import * as S from '@components/group/recruit/GroupRegist.styles';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';

function GroupRegistSchedule() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isNestedSidebar, setIsNestedSidebar] = useState({
    status: false,
    type: 'search', // 'suggest' | 'search'
  });

  const handleSearchTerm = (
    term: string,
    type: 'suggest' | 'search',
    toggled?: boolean
  ) => {
    setSearchTerm(term);
    setIsNestedSidebar({
      type: type,
      status: toggled ? !isNestedSidebar.status : true,
    });
  };

  return (
    <S.GroupRegistContainer>
      {/* 검색창 */}
      <div className="registGroup">
        <SearchBar
          onSearchTermChange={(term) => handleSearchTerm(term, 'search')}
        />
      </div>

      {/* 장소 추천  */}
      <div className="flex justify-end items-center font-medium text-[15px]">
        어디로 가야할지 모르겠다면?
        <Button
          type="button"
          styleType="text"
          className="ml-2"
          style={{
            minWidth: 'auto',
            fontSize: '15px',
          }}
          onClickHandler={() => handleSearchTerm(searchTerm, 'suggest', true)}
        >
          장소 추천 받기
        </Button>
      </div>

      {isNestedSidebar.status === true && (
        <NestedSidebar option={isNestedSidebar} searchTerm={searchTerm} />
      )}
    </S.GroupRegistContainer>
  );
}

export default GroupRegistSchedule;
