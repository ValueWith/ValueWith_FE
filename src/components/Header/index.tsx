import { useLocation, useNavigate } from 'react-router-dom';

// constants
import { PAGE_LINK } from '@/constants/pagelink';

// styles
import * as S from './Header.styles';
import theme from '@/assets/styles/theme';
import Logo from '@assets/TweaverLogo.svg?react';
import { useEffect, useState } from 'react';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentCategory, setCurrentCategory] = useState<string>('');

  useEffect(() => {
    setCurrentCategory(location.pathname);
  }, [location]);

  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        <S.HeaderLogo>
          <Logo
            color={`${theme.color.primary}`}
            onClick={() => navigate('/')}
          />
        </S.HeaderLogo>
        <S.HeaderMenu>
          <ul className="header__menu-list">
            {PAGE_LINK.map((page, index) => {
              return (
                <S.HeaderMenuItem
                  key={index}
                  className={page.path === currentCategory ? 'active' : ''}
                  onClick={() => navigate(page.path)}
                >
                  {page.name}
                </S.HeaderMenuItem>
              );
            })}
          </ul>
        </S.HeaderMenu>
      </S.HeaderInner>
    </S.HeaderContainer>
  );
}

export default Header;
