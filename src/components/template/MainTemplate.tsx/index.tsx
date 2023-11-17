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
      default:
        return '';
    }
  };

  useEffect(() => {
    setPageStyle(determinePageStyle(pathname));
  }, [pathname]);

  return (
    <S.TemplateContainer>
      <S.TemplateInner className={pageStyle}>{children}</S.TemplateInner>
    </S.TemplateContainer>
  );
}

export default MainTemplate;
