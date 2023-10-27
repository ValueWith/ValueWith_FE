export function calculateDday(dueDate: string) {
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate);
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
