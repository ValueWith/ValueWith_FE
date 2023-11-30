import { loginState } from '@/recoil/userState';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useUser = () => {
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);

  const [userInfo, setUserInfo] = useState({
    memberId: 0,
    memberNickname: '',
    memberEmail: '',
    memberProfileUrl: '',
  });

  const token = localStorage.getItem('accessToken');
  const userStorageInfo = localStorage.getItem('userInfo');

  useEffect(() => {
    if (token) {
      const userInfo = userStorageInfo ? JSON.parse(userStorageInfo) : {};

      setIsLogin(true);
      setUserInfo(userInfo);
    } else {
      setIsLogin(false);
    }
  }, [isLogin, userStorageInfo]);

  return { isLogin, setIsLogin, userInfo };
};
