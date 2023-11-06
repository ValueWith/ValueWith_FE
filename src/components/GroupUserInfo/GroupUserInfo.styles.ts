import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 8px;
  left: 13px;
  > span {
    font-size: 14px;
    letter-spacing: -0.7px;
    color: #1c1c1c;
  }
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 9px;
  border-radius: 100%;
`;
