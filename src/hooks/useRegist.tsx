import imageCompression from 'browser-image-compression';

import { useQuery } from 'react-query';
import {
  SuggestionsModel,
  getSuggestionData,
  groupEditRegisterRequest,
  groupRegisterRequest,
  recommendRouteRequest,
} from '@/apis/regist';
import { useEffect, useState } from 'react';
import { AREA_OPTION } from '@/constants/area';
import { findValueByProperty } from '@/utils/findCodeByLabel';
import { convertAreaName } from '@/utils/conversionArea';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalState';
import {
  PlaceObjectModel,
  selectedPlaceState,
  tempFormState,
} from '@/recoil/GroupRegistState';
import { useNavigate } from 'react-router-dom';
import { fetchGroupDetail } from '@/apis/groupDetail';

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

      const filteredData = data.filter((item: any) => item.addr1 !== '');

      if (prevCategory !== params.categoryCode) {
        setSuggestionData(filteredData);
      } else {
        if (prevArea !== params.areaCode) {
          setSuggestionData(filteredData);
        } else {
          setSuggestionData([...suggestionData, ...filteredData]);
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
  const navigate = useNavigate();
  const [modalDataState, setModalDataState] = useRecoilState(modalState);
  const [tempFormData, setTempFormData] = useRecoilState(tempFormState);
  const setSelectedPlace = useSetRecoilState(selectedPlaceState);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

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

    const convertedArea: string = convertAreaName(selectedArea);

    // 해당 지역의 value 값 찾기
    const areaValue = findValueByProperty(
      'value',
      convertedArea,
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

  const handleFormSubmit = async (
    data: any,
    file: any,
    isEdit?: boolean,
    editGroupID?: string,
    originThumbnail?: boolean
  ) => {
    try {
      setIsSubmitLoading(true);
      const formData = new FormData();

      if (isEdit) {
        data.tripGroupId = editGroupID;

        originThumbnail
          ? formData.append('isDeletedFile', String(false))
          : formData.append('isDeletedFile', String(true));
      }

      const requestBlob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });

      formData.append('tripGroupRequestDto', requestBlob);

      if (file && typeof file !== 'string') {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        };

        const compressedFile = await imageCompression(file, options);
        formData.append('file', compressedFile);
      } else {
        formData.append('file', '');
      }

      isEdit
        ? await groupEditRegisterRequest(formData)
        : await groupRegisterRequest(formData);

      setModalDataState({
        ...modalDataState,
        isModalOpen: true,
        title: `여행 그룹 ${isEdit ? '수정' : '등록'} 완료`,
        message: `여행 그룹 ${isEdit ? '수정' : '등록'}이 완료되었습니다.`,
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });

          navigate('/group');
        },
      });

      setTempFormData({});
      localStorage.removeItem('groupThumbnail');

      // 알럿 띄우기
    } catch (error) {
      setModalDataState({
        ...modalDataState,
        isModalOpen: true,
        confirmType: 'warning',
        title: `여행 그룹 ${isEdit ? '수정' : '등록'} 실패`,
        message: `여행 그룹 ${isEdit ? '수정' : '등록'}이 실패했습니다`,
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });
        },
      });
      console.log('error', error);
    } finally {
      setIsSubmitLoading(false);
    }
  };
  return {
    handleFilterArea,
    handleSetOrder,
    handleFormSubmit,
    isSubmitLoading,
  };
};

export const useRecommendRoute = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setSelectedPlace = useSetRecoilState(selectedPlaceState);

  const handleRecommendRoute = async (selectedPlace: any) => {
    const preProcessData = selectedPlace.map((item: any, index: number) => {
      return {
        index: index,
        placeCode: item.placeCode,
        x: Number(item.x),
        y: Number(item.y),
      };
    });

    try {
      setIsLoading(true);

      const response = await recommendRouteRequest(preProcessData);

      // 추천 경로 순으로 응답을 받으면. placeCode만 뽑아서 배열로 만들어서 리턴
      const recommendRoute = response.data.map((item: any) => item.placeCode);

      // selectedPlace 를 recommendRoute에 담긴 placeCode 순서대로 재정렬
      const selectedPlaceClone = [...selectedPlace];

      const reorderPlace = selectedPlaceClone.sort(
        (a: PlaceObjectModel, b: PlaceObjectModel) => {
          const placeCodeA = a.placeCode;
          const placeCodeB = b.placeCode;

          const indexA = recommendRoute.indexOf(placeCodeA);
          const indexB = recommendRoute.indexOf(placeCodeB);

          return indexA - indexB;
        }
      );

      setSelectedPlace({ selectedPlace: reorderPlace });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRecommendRoute, isLoading };
};

export const useEditGroup = () => {
  const [tempFormData, setTempFormData] = useRecoilState(tempFormState);
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectedPlaceState);
  const [isEdit, setIsEdit] = useState(false);
  const [editGroupID, setEditGroupID] = useState<string | undefined>(undefined);

  const handleEditData = async (pathname: string) => {
    if (pathname.startsWith('/group/edit')) {
      const match = pathname.match(/\/(\d+)$/);

      if (match) {
        const groupId = match[1];
        const response = await fetchGroupDetail(Number(groupId));

        setIsEdit(true);
        setEditGroupID(groupId);

        const preProcessData = response.places.map((item: any) => {
          return {
            placeCode: item.placeCode,
            name: item.name,
            address: item.address,
            category: item.category,
            orders: item.orders,
            x: Number(item.x),
            y: Number(item.y),
          };
        });

        console.log(preProcessData);
        setSelectedPlace({ selectedPlace: preProcessData });

        console.log(response);
        const tempFormData = {
          groupTitle: response.tripGroupDetail.name,
          groupDescription: response.tripGroupDetail.content,
          groupMemberCount: response.tripGroupDetail.maxUserNumber,
          departureDate: new Date(response.tripGroupDetail.tripDate),
          recruitmentEndDate: new Date(response.tripGroupDetail.dueDate),
          groupThumbnail: response.tripGroupDetail.thumbnailUrl,
        };

        setTempFormData(tempFormData);
      } else {
        setIsEdit(false);
        console.log('No match found');
      }
    }
  };

  return { handleEditData, isEdit, editGroupID };
};
