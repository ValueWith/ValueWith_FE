import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const GroupItemCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 90px;
  padding: 22px 23px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  margin-bottom: 6px;
  background-color: #fff;
  cursor: pointer;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    background-color: #f7fbff;
  }

  &.registed {
    margin-bottom: 12px;
    padding: 22px 23px 22px 10px;
  }

  .handle {
    margin-right: 5px;
  }
`;

export const GroupItemCardOrder = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 25px;
  min-width: 25px;
  height: 25px;
  margin-right: 12px;
  background-color: #f87973;
  color: #fff;
  font-size: 12px;

  &.food {
    background-color: #ffc645;
  }

  &.attraction {
    background-color: #4196f9;
  }

  &.hotel {
    background-color: #34a01a;
  }
`;

export const GroupItemCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GroupItemCardHeading = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const SearchResultDetailInfo = styled.div`
  display: flex;
  align-items: top;
  padding-right: 10px;
  color: ${theme.color.gray400};
`;

export const GroupItemCardCategory = styled.span`
  font-size: 13px;
  white-space: nowrap;
  color: ${theme.color.gray400};
`;

export const GroupItemCardAddress = styled.span`
  font-size: 13px;
  color: ${theme.color.gray400};
  word-break: keep-all;
  word-wrap: break-word;
`;

// 출발지 지정 버튼
export const SetDepartureButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  min-width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #e3e3e3;

  &:hover {
    &::after {
      content: '출발지로 지정하기';
      position: absolute;
      top: calc(100% + 5px);
      right: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 30px;
      padding: 0 10px;
      border-radius: 4px;
      background-color: #000;
      color: #fff;
      font-size: 13px;
      font-weight: 500;
    }
  }
`;
