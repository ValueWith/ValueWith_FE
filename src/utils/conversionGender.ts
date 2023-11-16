export const conversionGender = (gender: string) => {
  console.log('gender', gender);
  switch (gender) {
    case 'female':
      return '여성';
    case 'male':
      return '남성';
    default:
      return gender;
  }
};
