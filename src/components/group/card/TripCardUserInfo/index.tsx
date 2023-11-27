import { CSSProperties } from 'react';
import { conversionGender } from '@/utils/conversionGender';

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
  const koreanGender = conversionGender(gender);

  return (
    <S.ProfileContainer style={{ ...style }}>
      <S.ProfileImage src={profileUrl} alt='프로필 이미지' />
      <span style={{ ...style }}>
        {nickName}&nbsp;&#183;&nbsp;{age}대&nbsp;&#183;&nbsp;{koreanGender}
      </span>
    </S.ProfileContainer>
  );
}

export default TripCardUserInfo;
