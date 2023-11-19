export const conversionArea = (area: string): string => {
  switch (area) {
    case 'gangwon':
      return '강원';
    case 'gyeonggi':
      return '경기';
    case 'gyeongnam':
      return '경남';
    case 'gyeongbuk':
      return '경북';
    case 'gwangju':
      return '광주';
    case 'daegu':
      return '대구';
    case 'daejeon':
      return '대전';
    case 'busan':
      return '부산';
    case 'seoul':
      return '서울';
    case 'sejong':
      return '세종';
    case 'ulsan':
      return '울산';
    case 'incheon':
      return '인천';
    case 'jeonnam':
      return '전남';
    case 'jeonbuk':
      return '전북';
    case 'jeju':
      return '제주';
    case 'chungnam':
      return '충남';
    case 'chungbuk':
      return '충북';
    default:
      return area;
  }
};

interface AreaMappings {
  [key: string]: string;
}

export const convertAreaName = (originalName: string): string => {
  const areaMappings: AreaMappings = {
    서울특별시: '서울',
    경기도: '경기',
    강원특별자치도: '강원',
    경상북도: '경북',
    경상남도: '경남',
    전라북도: '전북',
    전라남도: '전남',
    충청북도: '충북',
    충청남도: '충남',
    제주특별자치도: '제주',
    인천광역시: '인천',
    대전광역시: '대전',
    대구광역시: '대구',
    광주광역시: '광주',
    부산광역시: '부산',
    울산광역시: '울산',
    세종특별자치시: '세종',
  };

  return areaMappings[originalName] || originalName;
};
