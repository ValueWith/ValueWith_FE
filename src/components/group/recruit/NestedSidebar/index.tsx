import useMapSearch from '@/hooks/useMapSearch';
import * as S from './NestedSidebar.styles';

interface NestedSidebarStatusProps {
  status: boolean;
  type: string; // 'suggest' | 'search'
}

interface NestedSidebarProps {
  option: NestedSidebarStatusProps;
  searchTerm: string;
  data: any;
}

function NestedSidebar({ option, searchTerm, data }: NestedSidebarProps) {
  console.log(data, 'data');

  const { searchResult } = useMapSearch({ searchTerm });

  return (
    <S.NestedSidebarContainer>
      {option.status && (
        <>
          <S.NestedSidebarHeading>
            {option.type === 'suggest'
              ? '이런 곳은 어때요?'
              : `"${searchTerm}" 검색 결과`}
          </S.NestedSidebarHeading>

          {searchResult.map((item: any, index: number) => {
            return <div key={index}>{item.place_name}</div>;
          })}
        </>
      )}
    </S.NestedSidebarContainer>
  );
}

export default NestedSidebar;
