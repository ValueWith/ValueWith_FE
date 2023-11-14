import { CSSProperties } from 'react';
import * as S from './GroupUserInfo.styles';

interface GroupUserInfoProps {
  profileUrl: string;
  nickName: string;
  age: number;
  gender: string;
  style?: CSSProperties;
}

function GroupUserInfo({
  profileUrl,
  nickName,
  age,
  gender,
  style,
}: GroupUserInfoProps) {
  return (
    <S.ProfileContainer>
      <S.ProfileImageContainer>
        <S.ProfileImage src={profileUrl} alt="프로필 이미지" />
        <S.ProfileName>{nickName}</S.ProfileName>
      </S.ProfileImageContainer>
      <S.ProfileInfo>
        <S.ProfileInfoLabel>{age}</S.ProfileInfoLabel>&nbsp;&#183;&nbsp;
        <S.ProfileInfoLabel>{gender}성</S.ProfileInfoLabel>
      </S.ProfileInfo>
    </S.ProfileContainer>
  );
}

export default GroupUserInfo;
