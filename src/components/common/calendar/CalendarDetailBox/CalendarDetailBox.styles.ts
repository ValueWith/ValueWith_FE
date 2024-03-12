import styled from '@emotion/styled';
import theme from '@/assets/styles/theme';

export const CalendarDetailBoxList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  margin-top: 20px;
`;
export const CalendarDetailBoxItem = styled.li``;

export const DetailBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  border-radius: 4px;
  background-color: ${theme.color.primary};
  padding: 0 16px;
  cursor: pointer;

  span {
    max-width: 80%;
    font-size: 16px;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const DetilBoxContent = styled.div``;

export const DetailBoxReview = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 92px;
  border-bottom: 1px solid #e6e6e6;
  font-size: 14px;
  color: ${theme.color.fontgray};

  &.noContent {
    align-items: center;
    justify-content: center;
  }

  &:not(.noContent) {
    padding: 12px 0;
  }
`;

export const DetailBoxReviewTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 6px;
`;

export const DetailBoxLinkBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0 10px;
  margin-top: 10px;
  margin-bottom: 22px;

  span {
    font-size: 13px;
    text-decoration: underline;
    text-underline-position: under;
    color: #000;
    cursor: pointer;
  }
`;
