import axios from 'axios';

export const key =
  'ZaKLTQ4YVv%2Fxm3MH5wZViKbWDtVeLw1IQmndQ0%2Bp4GthOdDlBrfGjdr1t4q5a1iGnwASF9zD2AF0jh9WHnw6Xg%3D%3D';

// Tour API로 검색
// TODO : 카테고리 선택에 지역 선택 추가
export const getRecommendedData = async (terms: string) => {
  const keyword = encodeURIComponent(terms);

  const response = await axios.get(
    `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${key}&pageNo=1&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=A&contentTypeId=12&keyword=${keyword}&_type=json`
  );

  return response;
};
