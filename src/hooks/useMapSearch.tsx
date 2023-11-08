import { useEffect, useState } from 'react';

const ps = new window.kakao.maps.services.Places();

interface MapSearchProps {
  searchTerm: string;
  page?: number;
}

function useMapSearch({ searchTerm, page = 1 }: MapSearchProps) {
  const [searchResult, setSearchResult] = useState<any>([]);

  const handleCheckEqual = (object1: any, object2: any) => {
    if (typeof object1 !== typeof object2) return false;
    if (typeof object1 !== 'object') return false;

    if (JSON.stringify(object1) === JSON.stringify(object2)) return true;
    else return false;
  };

  useEffect(() => {
    if (page > 3) return;

    // 장소검색 완료 시 호출
    const placesSearchCB = (data: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log('검색된 데이터', data);
        console.log(page, '페이지');

        if (page === 1) {
          setSearchResult(data);
        } else {
          const temp = [...searchResult, ...data];
          const temp2 = temp.filter((item, index) => {
            return (
              temp.findIndex((item2) => {
                return handleCheckEqual(item, item2);
              }) === index
            );
          });
          setSearchResult(temp2);
        }

        console.log(searchResult, '다합친 검색 데이터');

        // 하나로 쓸 수 있다
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        console.log('검색 결과가 존재하지 않습니다.');
        setSearchResult([]);
      } else if (status === kakao.maps.services.Status.ERROR) {
        console.log('검색 결과 중 오류가 발생했습니다.');
        setSearchResult([]);
      }
    };

    // 키워드 검색 요청 함수
    const searchPlaces = () => {
      ps.keywordSearch(searchTerm, placesSearchCB, {
        page: page, // 1~3
        size: 15, // 1~15
      });
    };

    if (searchTerm) {
      searchPlaces();
    }
  }, [searchTerm, page]);

  return { searchResult };
}

export default useMapSearch;
