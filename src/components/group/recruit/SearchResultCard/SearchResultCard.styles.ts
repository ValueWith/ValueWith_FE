import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const SearchResultCardContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 28px;
`;

export const SearchResultCardList = styled.ul``;

export const SearchResultCard = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 90px;
  padding: 22px 23px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  margin-bottom: 6px;
  background-color: #fff;
  cursor: default;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:hover {
    background-color: #f7fbff;
  }
`;

export const SearchResultCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SearchResultCardHeading = styled.h3`
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

export const SearchResultCardCategory = styled.span`
  font-size: 13px;
  color: ${theme.color.gray400};
`;

export const SearchResultCardAddress = styled.span`
  font-size: 13px;
  color: ${theme.color.gray400};
  word-break: break-all;
  word-wrap: break-word;
`;
