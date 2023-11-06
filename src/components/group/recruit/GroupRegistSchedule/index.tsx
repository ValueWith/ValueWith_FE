import { useEffect, useState } from 'react';

import NestedSidebar from '../NestedSidebar';

import * as S from '@components/group/recruit/GroupRegist.styles';
import SearchBar from '@/components/SearchBar';

function GroupRegistSchedule() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isNestedSidebar, setIsNestedSidebar] = useState({
    status: false,
    type: 'search', // 'suggest' | 'search'
  });

  const handleSearchTerm = (term: string, type: 'suggest' | 'search') => {
    setSearchTerm(term);
    setIsNestedSidebar({
      type: type,
      status: true,
    });
  };

  return (
    <S.GroupRegistContainer>
      {/* 검색창 */}
      <SearchBar
        onSearchTermChange={(term) => handleSearchTerm(term, 'search')}
      />

      <span onClick={() => handleSearchTerm(searchTerm, 'suggest')}>
        이런 곳은 어때요?
      </span>

      {isNestedSidebar.status === true && (
        <NestedSidebar option={isNestedSidebar} searchTerm={searchTerm} />
      )}
    </S.GroupRegistContainer>
  );
}

export default GroupRegistSchedule;
