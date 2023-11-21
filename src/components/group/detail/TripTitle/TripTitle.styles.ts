import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const TripDate = styled.span`
  font-size: 24px;
  font-weight: 500;
  color: #222222;
  letter-spacing: -1.2px;
`;

export const TripLocation = styled.span`
  color: ${theme.color.primary};
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -1.2px;
`;

export const ClipBoard = styled.button`
  min-width: 31px;
  height: 31px;
  border-radius: 50%;
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ClipBoardSuccess = styled.p`
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 12px;
`;
