import { useLocation } from 'react-router-dom';
import * as S from './MainTemplate.styles';
import { useEffect, useState } from 'react';

interface MainTemplateProps {
  children: React.ReactNode;
}

function MainTemplate({ children }: MainTemplateProps) {
  const { pathname } = useLocation();

  const [pageStyle, setPageStyle] = useState('');

  const determinePageStyle = (path: string) => {
    switch (path) {
      case '/login':
      case '/signup':
        return 'user';
      case '/chat':
        return 'chat';
      default:
        return '';
    }
  };

  useEffect(() => {
    setPageStyle(determinePageStyle(pathname));
  }, [pathname]);

  return (
    <S.TemplateContainer className={pageStyle}>
      <S.TemplateInner className={pageStyle}>{children}</S.TemplateInner>
    </S.TemplateContainer>
  );
}

export default MainTemplate;
