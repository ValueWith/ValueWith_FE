export const conversionGender = (gender: string) => {
  switch (gender) {
    case 'female':
      return '여성';
    case 'male':
      return '남성';
    default:
      return gender;
  }
};
