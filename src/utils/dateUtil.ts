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

export function formatTripDate(dateString: Date) {
  return dateString
    .toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\. /g, '-')
    .replace(/\.$/, '');
}

export function formatDueDate(dateString: Date) {
  return dateString
    ? dateString
        .toLocaleDateString(undefined, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .replace(/\. /g, '-')
        .replace(/\.$/, '')
    : '';
}

export function getCurrentTimeArray(): number[] {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();
  const millisecond = currentDate.getMilliseconds();

  return [year, month, day, hour, minute, second, millisecond];
}

export function formatTimeArray(timeArray: number[]): string {
  const [year, month, day, hours, minutes, seconds] = timeArray;
  const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedTime = new Intl.DateTimeFormat('en-US', options).format(
    dateObject
  );

  return formattedTime;
}

export function formatAlarmDate(dateArray: number[]): string {
  const [year, month, day, hours, minutes, seconds] = dateArray;

  const formattedDate = `${year}.${String(month).padStart(2, '0')}.${String(
    day
  ).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedDate;
}
