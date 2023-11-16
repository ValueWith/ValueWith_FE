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
