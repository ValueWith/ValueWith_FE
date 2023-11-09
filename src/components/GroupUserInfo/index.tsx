import * as S from './GroupUserInfo.styles';

interface GroupUserInfoProps {
  profileUrl: string;
  nickName: string;
  age: number;
  gender: string;
}

function GroupUserInfo({
  profileUrl,
  nickName,
  age,
  gender,
}: GroupUserInfoProps) {
  return (
    <S.ProfileContainer>
      <S.ProfileImage src={profileUrl} alt='프로필 이미지' />
      <span>
        {nickName} &bull; {age} &bull; {gender}성
      </span>
    </S.ProfileContainer>
  );
}

export default GroupUserInfo;
