export const extractNumber = (ageString: string) => {
  const match = ageString.match(/\d+/g);

  if (match) {
    return parseInt(match[0], 10);
  }

  return null;
};
