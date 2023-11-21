import theme from '@/assets/styles/theme';
import { useEffect } from 'react';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Polyline,
} from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';

import { getMarkerBackground } from '@/utils/getMarkerBackground';
import { mapOptionState, selectedPlaceState } from '@/recoil/GroupRegistState';
import { useLocation } from 'react-router-dom';
import Loader from '@/components/Loader';

function KakaoMap({ isDetail }: { isDetail?: boolean }) {
  const location = useLocation();

  const [selectedPlaceData, setSelectedPlaceData] =
    useRecoilState(selectedPlaceState);
  const [mapOptions, setMapOptions] = useRecoilState(mapOptionState);

  // 맵 마커는 selectedPlaceData.selectedPlace에 없을 때만 렌더링
  const shouldRenderMapMarker = selectedPlaceData.selectedPlace.every(
    (item) => {
      return (
        item.x !== mapOptions.center.lng && item.y !== mapOptions.center.lat
      );
    }
  );

  useEffect(() => {
    const isRecruit = location.pathname.startsWith('/group/recruit');

    if (isRecruit) {
      setSelectedPlaceData({ selectedPlace: [] });

      // 초기화 -> 상세 페이지에서 첫번째 장소로 지도 중심 설정하고 있어서 초기화 필요
      setMapOptions({
        ...mapOptions,
        center: { lat: 0, lng: 0 },
      });

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
            setMapOptions({
              ...mapOptions,
            });
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity, // 위치 정보를 가져오는데 걸리는 시간 제한 없음
          }
        );
      }
    } else if (!isRecruit) {
      if (selectedPlaceData.selectedPlace.length > 0) {
        setMapOptions({
          ...mapOptions,
          center: {
            lat: selectedPlaceData.selectedPlace[0].y,
            lng: selectedPlaceData.selectedPlace[0].x,
          },
        });
      }
    }
  }, [isDetail]);

  return (
    <Map
      style={{ width: '100%', height: '100%' }} // 지도 크기
      {...mapOptions}
    >
      {selectedPlaceData.selectedPlace.map((item, index) => (
        <CustomOverlayMap
          key={`marker-${index}`}
          position={{ lat: item.y, lng: item.x }}
        >
          <div
            style={{
              width: '30px',
              height: '30px',
              background: getMarkerBackground(item.category),
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span
              className="title"
              style={{
                fontSize: '12px',
                color: '#FFFFFF',
              }}
            >
              {index + 1}
            </span>
          </div>
        </CustomOverlayMap>
      ))}

      {selectedPlaceData.selectedPlace.length >= 2 && (
        <Polyline
          path={selectedPlaceData.selectedPlace.map((item) => ({
            lat: item.y,
            lng: item.x,
          }))}
          strokeColor={theme.color.primary}
          strokeOpacity={1}
          strokeWeight={5}
        />
      )}

      {shouldRenderMapMarker &&
        (mapOptions.center.lat !== 0 && mapOptions.center.lng !== 0 ? (
          <MapMarker position={mapOptions.center} />
        ) : (
          <>
            <Loader width={30} height={30} className="z-[1]" />
          </>
        ))}
    </Map>
  );
}

export default KakaoMap;
