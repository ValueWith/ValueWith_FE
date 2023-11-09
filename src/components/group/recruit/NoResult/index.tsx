import * as S from './NoResult.styles';

interface NoResultProps {
  children: React.ReactNode;
}

function NoResult({ children }: NoResultProps) {
  return <S.NoRsultContainer>{children}</S.NoRsultContainer>;
}

export default NoResult;
