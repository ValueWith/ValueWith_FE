import { CSSProperties } from 'react';
import * as S from './TripCardUserInfo.styles';

interface TripCardUserInfoProps {
  profileUrl: string;
  nickName: string;
  age: number;
  gender: string;
  style?: CSSProperties;
}

function TripCardUserInfo({
  profileUrl,
  nickName,
  age,
  gender,
  style,
}: TripCardUserInfoProps) {
  return (
    <S.ProfileContainer style={{ ...style }}>
      <S.ProfileImage src={profileUrl} alt='프로필 이미지' />
      <span style={{ ...style }}>
        {nickName}&nbsp;&#183;&nbsp;{age}&nbsp;&#183;&nbsp;{gender}성
      </span>
    </S.ProfileContainer>
  );
}

export default TripCardUserInfo;
