import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const UserWrapper = styled.div`
  padding-top: 156px;

  @media (max-width: 1024px) {
    padding-top: 120px;
  }

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 29px;
  cursor: default;
`;

export const UserContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const InputHeading = styled.label`
  display: flex;
  margin-bottom: 4px;
`;
