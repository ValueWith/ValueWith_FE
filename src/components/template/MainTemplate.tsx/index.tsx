import { useLocation } from 'react-router-dom';
import * as S from './MainTemplate.styles';
import { useEffect, useState } from 'react';

interface MainTemplateProps {
  children: React.ReactNode;
}

function MainTemplate({ children }: MainTemplateProps) {
  const { pathname } = useLocation();

  const [pageStyle, setPageStyle] = useState('');

  useEffect(() => {
    setPageStyle(
      pathname === '/login' || pathname === '/signup'
        ? 'user'
        : pathname === '/chat'
        ? 'chat'
        : ''
    );
  }, [pathname]);

  return (
    <S.TemplateContainer className={pageStyle}>
      <S.TemplateInner className={pageStyle}>{children}</S.TemplateInner>
    </S.TemplateContainer>
  );
}

export default MainTemplate;
