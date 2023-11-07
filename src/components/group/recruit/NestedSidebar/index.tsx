import useMapSearch from '@/hooks/useMapSearch';
import * as S from './NestedSidebar.styles';
import SearchResultCard from '../SearchResultCard';
import { useEffect, useState } from 'react';

interface NestedSidebarStatusProps {
  status: boolean;
  type: string; // 'suggest' | 'search'
}

interface NestedSidebarProps {
  option: NestedSidebarStatusProps;
  searchTerm: string;
  data?: any;
}

function NestedSidebar({ option, searchTerm }: NestedSidebarProps) {
  const [page, setPage] = useState<number>(1);
  const { searchResult } = useMapSearch({ searchTerm, page });

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handlePage = () => {
    setPage((page) => page + 1);
  };

  return (
    <S.NestedSidebarContainer>
      <S.NestedSidebarHeading>
        {option.type === 'suggest'
          ? '이런 곳은 어때요?'
          : `'${searchTerm}' 검색 결과`}
      </S.NestedSidebarHeading>
      <SearchResultCard data={searchResult} handlePage={handlePage} />
    </S.NestedSidebarContainer>
  );
}

export default NestedSidebar;
