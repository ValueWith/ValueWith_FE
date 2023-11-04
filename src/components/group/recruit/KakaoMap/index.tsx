import { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

function KakaoMap() {
  const [mapOptions, setMapOptions] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    level: 3,
    isPanto: true,
    zoomable: false,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setMapOptions({
            ...mapOptions,
            center: { lat: latitude, lng: longitude },
          });
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0, // 캐시된 위치 정보를 사용하지 않음
          timeout: Infinity, // 위치 정보를 가져오는데 걸리는 시간 제한 없음
        }
      );
    }
  }, [mapOptions, setMapOptions]);

  return (
    <Map
      style={{ width: '100%', height: '100%' }} // 지도 크기
      {...mapOptions}
    ></Map>
  );
}

export default KakaoMap;
