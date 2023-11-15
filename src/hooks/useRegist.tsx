import imageCompression from 'browser-image-compression';

import { useQuery } from 'react-query';
import {
  SuggestionsModel,
  getSuggestionData,
  groupRegisterRequest,
} from '@/apis/regist';
import { useEffect, useState } from 'react';
import { AREA_OPTION } from '@/constants/area';
import { findValueByProperty } from '@/utils/findCodeByLabel';
import instance from '@/apis';

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

export const useRegistGroup = () => {
  const handleFilterArea = (data: any) => {
    const areaExtraction = data
      .map((item: any) => item.address.split(' ')[0])
      .reduce((acc: any, cur: any) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
      }, {});

    // area 객체에서 가장 많이 등장한 지역을 선택
    const selectedArea = Object.keys(areaExtraction).reduce(
      (maxArea, area) =>
        areaExtraction[area] > areaExtraction[maxArea] ? area : maxArea,
      Object.keys(areaExtraction)[0]
    );

    // 해당 지역의 value 값 찾기
    const areaValue = findValueByProperty(
      'value',
      selectedArea,
      'label',
      AREA_OPTION
    );

    return areaValue;
  };

  const handleSetOrder = (data: any) => {
    const setOrderPlace = data.map((item: any, index: number) => {
      return {
        ...item,
        orders: index + 1,
      };
    });

    return setOrderPlace;
  };

  const handleFormSubmit = async (data: any, file: any) => {
    console.log(data, '전송되는 데이터');

    try {
      const formData = new FormData();

      const requestBlob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });

      formData.append('tripGroupRequestDto', requestBlob);

      if (file) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        };

        const compressedFile = await imageCompression(file, options);
        formData.append('file', compressedFile);
      } else {
        formData.append('file', '');
      }

      const response = await groupRegisterRequest(formData);
    } catch (error) {
      console.log('error', error);
    }
  };
  return { handleFilterArea, handleSetOrder, handleFormSubmit };
};
