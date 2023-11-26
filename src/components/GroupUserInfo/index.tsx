import { CSSProperties, useEffect, useState } from 'react';
import * as S from './GroupUserInfo.styles';
import Button from '../common/Button';
import theme from '@/assets/styles/theme';
import { conversionGender } from '@/utils/conversionGender';
import { useLounge } from '@/hooks/useLounge';
import Loader from '../common/Loader';

interface GroupUserInfoProps {
  type?: string; // approved | pending
  tripGroupId: number;
  groupMemberId: number;
  profileUrl: string;
  nickName: string;
  age: number;
  gender: string;
  style?: CSSProperties;
}

function GroupUserInfo({
  type,
  tripGroupId,
  groupMemberId,
  profileUrl,
  nickName,
  age,
  gender,
  style,
}: GroupUserInfoProps) {
  const [listType, setListType] = useState('');
  const {
    handleMemberConfirm,
    handleMemberReject,
    handleMemberKick,
    isLoading,
  } = useLounge();

  useEffect(() => {
    if (type === 'approved') {
      setListType('approved');
    } else {
      setListType('pending');
    }
  }, [type]);

  return (
    <S.ProfileContainer>
      {isLoading && <Loader className="z-[1]" />}

      <S.ProfileImageContainer>
        <S.ProfileImage src={profileUrl} alt="프로필 이미지" />
        <S.ProfileName>{nickName}</S.ProfileName>
      </S.ProfileImageContainer>
      <S.ProfileInfo>
        <S.ProfileInfoLabel>{age}</S.ProfileInfoLabel>&nbsp;&#183;&nbsp;
        <S.ProfileInfoLabel>{conversionGender(gender)}</S.ProfileInfoLabel>
      </S.ProfileInfo>

      <div className="flex items-center ml-auto">
        {listType === 'approved' ? (
          <>
            <Button
              type="button"
              styleType="text"
              style={{
                height: '24px',
                minWidth: 'auto',
                color: `${theme.color.red300}`,
                padding: '0 8px',
                fontSize: '12px',
              }}
              onClickHandler={() =>
                handleMemberKick(tripGroupId, groupMemberId)
              }
            >
              그룹에서 추방
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              styleType="text"
              style={{
                height: '24px',
                minWidth: 'auto',
                color: `${theme.color.red300}`,
                padding: '0 8px',
                fontSize: '12px',
              }}
              onClickHandler={() => handleMemberReject(groupMemberId)}
            >
              거절
            </Button>
            <Button
              type="button"
              size="sm"
              styleType="solid"
              className="ml-5"
              style={{
                height: '24px',
                minWidth: 'auto',
                backgroundColor: '#F1F9FF',
                color: `${theme.color.primary}`,
                padding: '0 8px',
                fontSize: '12px',
              }}
              onClickHandler={() => handleMemberConfirm(groupMemberId)}
            >
              멤버로 초대
            </Button>
          </>
        )}
      </div>
    </S.ProfileContainer>
  );
}

export default GroupUserInfo;
