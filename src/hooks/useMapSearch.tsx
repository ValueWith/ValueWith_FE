import { useEffect, useState } from 'react';

const ps = new window.kakao.maps.services.Places();

interface MapSearchProps {
  searchTerm: string;
  page?: number;
}

function useMapSearch({ searchTerm, page = 1 }: MapSearchProps) {
  const [searchResult, setSearchResult] = useState<any>([]);
  const [isLast, setIsLast] = useState<boolean>(false);

  const handleCheckEqual = (object1: any, object2: any) => {
    if (typeof object1 !== typeof object2) return false;
    if (typeof object1 !== 'object') return false;

    if (JSON.stringify(object1) === JSON.stringify(object2)) return true;
    else return false;
  };

  useEffect(() => {
    if (isLast) return;

    // 장소검색 완료 시 호출
    const placesSearchCB = (data: any, status: any, pagination: any) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log('검색된 데이터', data);
        console.log(pagination, '페이지네이션');
        console.log(page, '페이지');

        if (pagination.last === pagination.current) {
          setIsLast(true);
        }

        if (page === 1) {
          setSearchResult(data);
        } else {
          const updatedResult = [...searchResult, ...data];
          const deduplicatedResult = updatedResult.filter((item, index) => {
            return (
              updatedResult.findIndex((item2) => {
                return handleCheckEqual(item, item2);
              }) === index
            );
          });
          setSearchResult(deduplicatedResult);
        }
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

  useEffect(() => {
    setIsLast(false);
    setSearchResult([]);
  }, [searchTerm]);

  return { searchResult, isLast };
}

export default useMapSearch;
