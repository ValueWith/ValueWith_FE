import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const Dimmed = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: default;
  z-index: 3;
`;

export const GroupFilterContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  width: 372px;
  padding: 20px;
  box-shadow: 0 0 6px #00000029;
  background-color: ${theme.color.white};
  border-radius: 4px;
  text-align: left;
  z-index: 4;
  cursor: default;

  &.filter {
    min-height: 440px;
  }
  &.sort {
    min-height: 92px;
  }
`;

export const FilterTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #333749;
  margin: 12px 0;

  &:first-of-type {
    margin: 0 0 12px 0;
  }
`;
