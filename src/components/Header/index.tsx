import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// constants
import { PAGE_LINK } from '@/constants/pagelink';

// components
import { RiMessage2Line } from 'react-icons/ri';
import { AiOutlineBell } from 'react-icons/ai';

import Button from '../Button';

// styles
import * as S from './Header.styles';
import theme from '@/assets/styles/theme';
import Logo from '@assets/TweaverLogo.svg?react';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<string>('');

  useEffect(() => {
    setCurrentCategory(location.pathname);
  }, [location]);

  const handleLogin = () => {
    console.log('로그인');
  };

  return (
    <S.HeaderContainer>
      <S.HeaderInner>
        {/* 로고 */}
        <S.HeaderLogo>
          <Logo
            color={`${theme.color.primary}`}
            onClick={() => navigate('/')}
          />
        </S.HeaderLogo>

        {/* 헤더 메뉴 */}
        <S.HeaderMenu>
          <ul className='header__menu-list'>
            {PAGE_LINK.map((page, index) => {
              return (
                <S.HeaderMenuItem
                  key={index}
                  className={page.path === currentCategory ? 'active' : ''}
                  onClick={() => {
                    navigate(page.path);
                    window.location.reload();
                  }}
                >
                  {page.name}
                </S.HeaderMenuItem>
              );
            })}
          </ul>
        </S.HeaderMenu>

        {/* 사용자 액션  */}
        <S.UserActionsWrapper>
          {isLogin && (
            <S.UserActions>
              {/* 채팅 */}
              <S.UserActionItem>
                <RiMessage2Line size={24} />
              </S.UserActionItem>

              {/* 알림 */}
              <S.UserActionItem>
                <AiOutlineBell size={24} />
              </S.UserActionItem>
            </S.UserActions>
          )}

          {/* 로그인 / 로그아웃 */}
          <Button type='button' styleType='basic' onClickHandler={handleLogin}>
            로그인
          </Button>
        </S.UserActionsWrapper>
      </S.HeaderInner>
    </S.HeaderContainer>
  );
}

export default Header;
