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

function KakaoMap() {
  const [selectedPlaceData] = useRecoilState(selectedPlaceState);
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

      {shouldRenderMapMarker && <MapMarker position={mapOptions.center} />}
    </Map>
  );
}

export default KakaoMap;
