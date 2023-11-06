import { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

function KakaoMap() {
  const ps = new window.kakao.maps.services.Places();

  const [mapOptions, setMapOptions] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    level: 3,
    isPanto: true,
    zoomable: false,
  });

  useEffect(() => {
    // 키워드 검색을 요청하는 함수입니다
    const searchPlaces = () => {
      const keyword = '화정역 맛집';

      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    };

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    const placesSearchCB = (data: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log('data', data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    };

    searchPlaces();
  }, []);

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
          maximumAge: 0,
          timeout: Infinity, // 위치 정보를 가져오는데 걸리는 시간 제한 없음
        }
      );
    }
  }, []);

  return (
    <Map
      style={{ width: '100%', height: '100%' }} // 지도 크기
      {...mapOptions}
    ></Map>
  );
}

export default KakaoMap;
