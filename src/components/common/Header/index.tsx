import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalState';
import { paramsState } from '@/recoil/paramsState';
import { loginState } from '@/recoil/userState';

import {
  getUserInfo,
  removeAccessToken,
  removeUserInfo,
} from '@/utils/localStorage';

// constants
import { PAGE_LINK, MYLOUNGE_SUBMENU_LINK } from '@/constants/pagelink';

// components
import { RiMessage2Line } from 'react-icons/ri';
import Alarm from '@/components/alarm/Alarm';
import Button from '../Button';
import DropdownMenu from '../DropdownMenu';

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
  const [modalDataState, setModalDataState] = useRecoilState(modalState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const userInfo = getUserInfo();

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
        removeAccessToken();
        removeUserInfo();
        setIsLogin(false);
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

  const handleGroup = () => {
    setParams({
      page: '1',
      status: 'all',
      area: 'all',
      sort: 'latest',
      title: '',
    });
  };

  const handleLinkAction = (page: { name: string; path: string }) => {
    if (page.name === '로그인') {
      handleLogin();
    }

    if (page.path === '/group') {
      handleGroup();
    }

    if (page.path === '/mylounge') {
      if (!isLogin) return navigate('/login');
    }

    navigate(page.path);
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
          <ul className="list">
            {PAGE_LINK.map((page, index) => {
              return (
                <S.HeaderMenuItem
                  key={index}
                  className={
                    location.pathname.startsWith(page.path) ? 'active' : ''
                  }
                  onClick={() => {
                    handleLinkAction(page);
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
          {isLogin ? (
            <S.UserActions>
              {/* 채팅 */}
              <S.UserActionItem onClick={() => navigate('/chat')}>
                <RiMessage2Line size={24} />
              </S.UserActionItem>

              {/* 알림 */}
              <S.UserActionItem className="relative">
                <Alarm />
              </S.UserActionItem>

              <S.UserActionItem className="userProfile">
                <DropdownMenu
                  options={[
                    {
                      label: '내 프로필 수정',
                      onClickHandler: () => navigate('/mylounge/profile'),
                    },
                    {
                      label: '로그아웃',
                      onClickHandler: () => handleLogout(),
                    },
                  ]}
                  dropdownMunuStyle={{
                    top: 'calc(100% + 10px)',
                    left: '-37px',
                  }}
                >
                  <S.ProfileDropdownContainer>
                    {userInfo?.memberProfileUrl && (
                      <S.ProfileImage
                        src={userInfo.memberProfileUrl}
                        alt="프로필 사진"
                      />
                    )}
                    {userInfo?.memberNickname && (
                      <>
                        <S.ProfileNickname>
                          {userInfo.memberNickname}
                        </S.ProfileNickname>
                        &nbsp;님
                      </>
                    )}
                  </S.ProfileDropdownContainer>
                </DropdownMenu>
              </S.UserActionItem>
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
