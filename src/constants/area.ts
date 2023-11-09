export const AREA_OPTION = [
  { label: '강원', value: 'gangwon', code: 32 },
  { label: '경기', value: 'gyeonggi', code: 31 },
  { label: '경남', value: 'gyeongnam', code: 36 },
  { label: '경북', value: 'gyeongbuk', code: 35 },
  { label: '광주', value: 'gwangju', code: 5 },
  { label: '대구', value: 'daegu', code: 4 },
  { label: '대전', value: 'daejeon', code: 3 },
  { label: '부산', value: 'busan', code: 6 },
  { label: '서울', value: 'seoul', code: 1 },
  { label: '세종', value: 'sejong', code: 8 },
  { label: '울산', value: 'ulsan', code: 7 },
  { label: '인천', value: 'incheon', code: 2 },
  { label: '전남', value: 'jeonnam', code: 38 },
  { label: '전북', value: 'jeonbuk', code: 37 },
  { label: '제주', value: 'jeju', code: 39 },
  { label: '충남', value: 'chungnam', code: 34 },
  { label: '충북', value: 'chungbuk', code: 33 },
];

export const AREA_OPTION_LABEL = AREA_OPTION.map((item) => item.label);

export const CATEGORY_OPTION = [
  {
    label: '전체',
    code: null,
  },
  {
    label: '관광지',
    code: 12,
  },
  {
    label: '음식점',
    code: 39,
  },
  {
    label: '문화시설',
    code: 14,
  },
  {
    label: '축제공연행사',
    code: 15,
  },
  {
    label: '레포츠',
    code: 28,
  },
  {
    label: '숙박',
    code: 32,
  },
  {
    label: '쇼핑',
    code: 38,
  },
];

export const CATEGORY_LABEL = CATEGORY_OPTION.map((item) => item.label);
