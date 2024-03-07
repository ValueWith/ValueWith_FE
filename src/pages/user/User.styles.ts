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

export const Divider = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin-top: 80px;
  background-color: ${theme.color.gray200};

  &::after {
    content: 'OR';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 72px;
    background-color: white;
    text-align: center;
    font-size: 13px;
    color: ${theme.color.fontgray};
  }
`;

export const SocialLoginContainer = styled.div``;

export const EmailButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  margin-top: 25px;
  border-radius: 4px;
  background-color: #d0e9ff;
  font-size: 17px;
  font-weight: 500;
`;

export const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  margin-top: 10px;
  border-radius: 4px;
  background-color: #ffeb3b;
  font-size: 17px;
  font-weight: 500;
`;
