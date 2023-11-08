import { useQuery } from 'react-query';
import { SuggestionsModel, getSuggestionData } from '@/apis/regist';
import { useEffect, useState } from 'react';

// TODO : params 타입 정의
export const useGetSuggestionData = (params: SuggestionsModel) => {
  const [suggestionData, setSuggestionData] = useState<any>([]);
  const [prevCategory, setPrevCategory] = useState<number | null>(null);
  const [prevArea, setPrevArea] = useState<number | null>(null);

  const {
    isLoading: isTourLoading,
    isError: isTourError,
    isSuccess: isTourSuccess,
    data: TourState,
  } = useQuery(['tourData', params], () => getSuggestionData(params), {
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isTourSuccess) {
      const data = TourState?.data?.response?.body?.items.item || [];
      console.log(data);

      if (prevCategory !== params.categoryCode) {
        setSuggestionData(data);
      } else {
        if (prevArea !== params.areaCode) {
          setSuggestionData(data);
        } else {
          setSuggestionData([...suggestionData, ...data]);
        }
      }
      setPrevCategory(params.categoryCode);
      setPrevArea(params.areaCode);
    }
  }, [isTourSuccess, TourState]);

  return {
    isTourLoading,
    isTourError,
    isTourSuccess,
    suggestionData,
  };
};
