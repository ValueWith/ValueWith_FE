import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { useRecoilState } from 'recoil';
import { tokenState } from '@/recoil/userState';
import { modalState } from '@/recoil/modalState';

// constants
import { PAGE_LINK, MYLOUNGE_SUBMENU_LINK } from '@/constants/pagelink';

import { paramsState } from '@/recoil/paramsState';

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

  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(true);


  const setParams = useSetRecoilState(paramsState);
  const [token, setToken] = useRecoilState<string | null>(tokenState);
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  useEffect(() => {
    if (location.pathname.startsWith('/mylounge')) {
      setIsSubMenuVisible(true);
    } else {
      setIsSubMenuVisible(true);

      const delayTimeout = setTimeout(() => {
        setIsSubMenuVisible(false);
      }, 300);

      return () => clearTimeout(delayTimeout);
    }
  }, [location]);

  useEffect(() => {
    setCurrentCategory(location.pathname);
  }, [location]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGroup = () => {
    setParams({
      page: '1',
      status: 'all',
      area: 'all',
      sort: 'latest',
      title: '',
    });
  };

  const handleLogout = () => {
    setModalDataState({
      isModalOpen: true,
      type: 'confirm',
      title: '로그아웃',
      message: 'Tweaver에서 로그아웃 하시겠습니까?',
      onConfirm: () => {
        setModalDataState({
          ...modalDataState,
          isModalOpen: false,
        });
        setToken(null);
        navigate('/');
      },
      onCancel: () => {
        setModalDataState({
          ...modalDataState,
          isModalOpen: false,
        });
      },
    });
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
                  className={
                    location.pathname.startsWith(page.path) ? 'active' : ''
                  }
                  onClick={() => {
                    navigate(page.path);

                    if (page.name === '로그인') {
                      handleLogin();
                    }

                    if (page.path === '/group') {
                      // paramState 초기화
                      handleGroup();
                    }
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
          {token ? (
            <S.UserActions>
              {/* 채팅 */}
              <S.UserActionItem>
                <RiMessage2Line size={24} />
              </S.UserActionItem>

              {/* 알림 */}
              <S.UserActionItem>
                <AiOutlineBell size={24} />
              </S.UserActionItem>

              <span className='ml-4'>|</span>

              <Button
                type='button'
                styleType='text'
                className='ml-4'
                style={{
                  minWidth: 'auto',
                  color: `${theme.color.fontgray}`,
                  fontSize: '15px',
                }}
                onClickHandler={handleLogout}
              >
                로그아웃
              </Button>
            </S.UserActions>
          ) : (
            <Button
              type="button"
              styleType="basic"
              onClickHandler={handleLogin}
            >
              로그인
            </Button>
          )}
        </S.UserActionsWrapper>
      </S.HeaderInner>

      {/* 서브 메뉴 */}
      {currentCategory.startsWith('/mylounge') && (
        <S.SubMenuContainer style={{ opacity: isSubMenuVisible ? 1 : 0 }}>
          <S.HeaderInner>
            <S.SubMenuList>
              {MYLOUNGE_SUBMENU_LINK.map((page, index) => {
                const isActive =
                  currentCategory.startsWith(page.path) ||
                  (currentCategory === '/mylounge' && index === 0);

                return (
                  <S.SubMenuItem
                    key={index}
                    className={isActive ? 'active' : ''}
                    onClick={() => {
                      navigate(page.path);
                    }}
                  >
                    {page.name}
                  </S.SubMenuItem>
                );
              })}
            </S.SubMenuList>
          </S.HeaderInner>
        </S.SubMenuContainer>
      )}
    </S.HeaderContainer>
  );
}

export default Header;
