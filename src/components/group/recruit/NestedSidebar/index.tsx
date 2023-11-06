import * as S from './NestedSidebar.styles';

interface NestedSidebarStatusProps {
  status: boolean;
  type: string; // 'suggest' | 'search'
}

interface NestedSidebarProps {
  option: NestedSidebarStatusProps;
  searchTerm?: string;
  data: any;
}

function NestedSidebar({ option, searchTerm, data }: NestedSidebarProps) {
  console.log(data, 'data');

  return (
    <S.NestedSidebarContainer>
      {option.status && (
        <>
          <S.NestedSidebarHeading>
            {option.type === 'suggest'
              ? '이런 곳은 어때요?'
              : `"${searchTerm}" 검색 결과`}
          </S.NestedSidebarHeading>
        </>
      )}

      {data.map((item, index) => {
        return <div>야호</div>;
      })}
    </S.NestedSidebarContainer>
  );
}

export default NestedSidebar;
