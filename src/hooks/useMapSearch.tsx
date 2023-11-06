import { useEffect, useState } from 'react';

const ps = new window.kakao.maps.services.Places();

function useMapSearch({ searchTerm }: { searchTerm: string }) {
  const [searchResult, setSearchResult] = useState<any>([]);

  useEffect(() => {
    // 장소검색 완료 시 호출
    const placesSearchCB = (data: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log('검색된 데이터', data);
        setSearchResult(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    };

    // 키워드 검색 요청 함수
    const searchPlaces = () => {
      ps.keywordSearch(searchTerm, placesSearchCB);
    };

    if (searchTerm) {
      searchPlaces();
    }
  }, [searchTerm]);

  return { searchResult };
}

export default useMapSearch;
