import { useQuery } from 'react-query';
import { getRecommendedData } from '@/apis/regist';
import { useEffect, useState } from 'react';

// TourAPI로 검색
export const useGetRecommendedData = (params: string) => {
  const [recommendedData, setRecommendedData] = useState([]);

  const {
    isLoading: isTourLoading,
    isError: isTourError,
    isSuccess: isTourSuccess,
    data: TourState,
    refetch: TourRefetch,
  } = useQuery(['tourData', params], () => getRecommendedData(params), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (isTourSuccess) {
      setRecommendedData(TourState?.data?.response?.body?.items.item || []);
    }
  }, [isTourSuccess, TourState]);

  return {
    isTourLoading,
    isTourError,
    isTourSuccess,
    TourState,
    TourRefetch,
    recommendedData,
  };
};
