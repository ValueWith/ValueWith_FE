import useMapSearch from '@/hooks/useMapSearch';
import * as S from './NestedSidebar.styles';
import * as CS from '@components/group/recruit/GroupRegist.styles';
import SearchResultCard from '../GroupItemCard';
import { useEffect, useState, useRef } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

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
  const target = useRef(null);

  const [page, setPage] = useState<number>(1);
  const { searchResult } = useMapSearch({ searchTerm, page });

  const [observe, unobserve] = useIntersectionObserver(() => {
    handlePage();
  });

  const handlePage = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    const targetRef = target.current;
    if (!targetRef) return;

    if (target) {
      observe(targetRef);

      return () => {
        unobserve(targetRef);
      };
    }

    if (searchResult.length === 0) {
      unobserve(targetRef);
    }
  }, [searchResult, target]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <S.NestedSidebarContainer>
      <S.NestedSidebarHeading>
        {option.type === 'suggest'
          ? '이런 곳은 어때요?'
          : `'${searchTerm}' 검색 결과`}
      </S.NestedSidebarHeading>

      <CS.GroupItemCardContainer>
        <div>
          {searchResult.map((item: any, index: number) => (
            <SearchResultCard key={index} item={item} />
          ))}
        </div>
        {searchResult && searchResult.length > 0 && (
          <span ref={target} style={{ width: '100%', height: 30 }} />
        )}
      </CS.GroupItemCardContainer>
    </S.NestedSidebarContainer>
  );
}

export default NestedSidebar;
