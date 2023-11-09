export const getMarkerBackground = (category: string) => {
  if (category.includes('숙박')) {
    return '#34a01a';
  } else if (
    category.includes('음식점') ||
    category.includes('카페') ||
    category.includes('식당')
  ) {
    return '#ffc645';
  } else if (
    category.includes('관광') ||
    category.includes('문화') ||
    category.includes('역사') ||
    category.includes('행사')
  ) {
    return '#4196f9';
  } else {
    return '#f87973';
  }
};
