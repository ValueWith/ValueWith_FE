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

import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalState';
import { tempFormState } from '@/recoil/GroupRegistState';

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
  const [modalDataState, setModalDataState] = useRecoilState(modalState);
  const [tempFormData, setTempFormData] = useRecoilState(tempFormState);

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

    const convertArea = selectedArea === '서울특별시' ? '서울' : selectedArea;

    // 해당 지역의 value 값 찾기
    const areaValue = findValueByProperty(
      'value',
      convertArea,
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

      setModalDataState({
        ...modalDataState,
        isModalOpen: true,
        title: '여행 그룹 등록 완료',
        message: '여행 그룹 등록이 완료되었습니다.',
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });

          window.location.href = '/group';
        },
      });

      setTempFormData({});

      // 알럿 띄우기
    } catch (error) {
      setModalDataState({
        ...modalDataState,
        isModalOpen: true,
        title: '여행 그룹 등록 실패',
        message: '여행 그룹 등록이 실패하였습니다.',
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });

          window.location.href = '/group';
        },
      });
      console.log('error', error);
    }
  };
  return { handleFilterArea, handleSetOrder, handleFormSubmit };
};
