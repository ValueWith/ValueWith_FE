export function calculateDday(dueDate: string) {
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate + 'T00:00:00'); // 시간을 00:00:00 으로 설정하여 날짜만 비교
  const timeDifference = dueDateObj.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  if (daysDifference === 0) {
    return 'D-day';
  } else if (daysDifference > 0) {
    return `D-${daysDifference}`;
  } else {
    return `마감`;
  }
}

export function formatKoreanDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}

export function formatDotDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
