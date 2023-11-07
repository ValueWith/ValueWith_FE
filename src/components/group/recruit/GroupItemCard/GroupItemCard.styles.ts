import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const GroupItemCard = styled.div`
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
`;

// TODO : 카테고리에 따라 색상 변경
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
  align-items: center;
  padding-right: 10px;
  color: ${theme.color.gray400};
`;

export const GroupItemCardCategory = styled.span`
  font-size: 13px;
  color: ${theme.color.gray400};
`;

export const GroupItemCardAddress = styled.span`
  font-size: 13px;
  color: ${theme.color.gray400};
  word-break: break-all;
  word-wrap: break-word;
`;
