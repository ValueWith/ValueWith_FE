import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 11px;

  > span {
    font-size: 14px;
    letter-spacing: -0.7px;
    color: #1c1c1c;
  }
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 9px;
  border-radius: 100%;
`;

export const ProfileName = styled.span`
  font-size: 13px;
  cursor: default;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.color.gray700};
  cursor: default;
`;

export const ProfileInfoLabel = styled.div`
  font-size: 12px;
`;
