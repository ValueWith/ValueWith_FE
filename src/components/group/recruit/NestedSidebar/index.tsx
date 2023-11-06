import * as S from './NestedSidebar.styles';

interface NestedSidebarStatusProps {
  status: boolean;
  type: string; // 'suggest' | 'search'
}

interface NestedSidebarProps {
  option: NestedSidebarStatusProps;
  searchTerm?: string;
}

function NestedSidebar({ option, searchTerm }: NestedSidebarProps) {
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
    </S.NestedSidebarContainer>
  );
}

export default NestedSidebar;
