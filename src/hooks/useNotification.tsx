import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useNotification() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkNotificationSupport = async () => {
      if (!('Notification' in window)) {
        console.log('이 브라우저는 Notification API를 지원하지 않습니다.');
        return;
      } else {
        // 알림 권한 요청 팝업 띄우기
        Notification.requestPermission();
      }
    };

    checkNotificationSupport();
  }, []);

  const sendNotification = (
    title: string,
    options: any,
    redirectUrl: string
  ) => {
    const newOptions = {
      badge: '../../tweaver.svg',
      icon: '../../tweaver.svg',
      ...options,
    };

    if (Notification.permission === 'granted') {
      // 알림 권한이 허용되어 있는 경우
      const notification = new Notification(`Tweaver - ${title}`, newOptions);

      notification.onclick = () => {
        window.focus();
        navigate(redirectUrl);
      };
    } else {
      console.log('알림 권한이 허용되지 않았습니다.');
      try {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        });
      } catch (error) {
        if (error instanceof TypeError) {
          // Safari
          Notification.requestPermission().then((permission) => {
            if (permission !== 'granted') return;
          });
        } else {
          console.error(error);
        }
      }
    }
  };

  return sendNotification;
}

export default useNotification;
