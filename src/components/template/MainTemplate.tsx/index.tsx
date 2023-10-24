import * as S from './MainTemplate.styles';

interface MainTemplateProps {
  children: React.ReactNode;
}

function MainTemplate({ children }: MainTemplateProps) {
  return <S.TemplateContainer>{children}</S.TemplateContainer>;
}

export default MainTemplate;
