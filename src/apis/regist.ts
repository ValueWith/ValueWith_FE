import axios from 'axios';
import { useState } from 'react';
import instance from '.';

// export const key =
//   'ZaKLTQ4YVv%2Fxm3MH5wZViKbWDtVeLw1IQmndQ0%2Bp4GthOdDlBrfGjdr1t4q5a1iGnwASF9zD2AF0jh9WHnw6Xg%3D%3D';

export const key =
  'ompzpsrcSsZjQb6%2BQzGk1uP88alqJcWCdRmvneUwNI9F75haQ11AoAaS7MIoa89p1OHjLVaGxH6nRnVX85HzzQ%3D%3D';

export interface SuggestionsModel {
  page: number;
  areaCode: number | null;
  categoryCode: number | null;
}

// TOUP API에서 추천 데이터
export const getSuggestionData = async ({
  page,
  areaCode,
  categoryCode,
}: SuggestionsModel) => {
  const baseUrl = `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${key}&pageNo=${page}&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=A&areaCode=${areaCode}&_type=json`;

  if (categoryCode) {
    const response = await axios.get(
      `${baseUrl}&contentTypeId=${categoryCode}`
    );
    return response;
  } else {
    const response = await axios.get(`${baseUrl}`);
    return response;
  }
};

// 추천 경로
export const recommendRouteRequest = (data: any) => {
  return instance.post('/api/recommend/route', data);
};

// 그룹 등록
export const groupRegisterRequest = (data: any) => {
  return instance.post('/api/groups', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 그룹 수정
export const groupEditRegisterRequest = (data: any) => {
  return instance.put('/api/groups', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
