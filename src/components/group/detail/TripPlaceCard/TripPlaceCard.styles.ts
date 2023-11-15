import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const TripPlaceCardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 56.5px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const TripPlaceCardOrder = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  min-width: 25px;
  height: 25px;
  margin-right: 12px;
  background-color: #f87973;
  color: #fff;
  font-size: 12px;
`;

export const TripPlaceCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TripPlaceCardHeading = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const TripPlaceCardDetailInfo = styled.div`
  display: flex;
  align-items: top;
  padding-right: 10px;
  color: ${theme.color.gray400};
`;

export const TripPlaceCardCategory = styled.span`
  font-size: 13px;
  white-space: nowrap;
  color: ${theme.color.gray400};
`;

export const TripPlaceCardAddress = styled.span`
  font-size: 13px;
  color: ${theme.color.gray400};
  word-break: keep-all;
  word-wrap: break-word;
`;

export const TripPlaceDistanceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TripPlaceDistance = styled.p`
  display: flex;
  align-items: center;
  gap: 3px;
  text-align: right;
  font-size: 12px;
  color: #575757;
  letter-spacing: -0.6px;
`;

export const TripPlaceDistanceLine = styled.p`
  height: 48px;
  border: 1px dashed ${theme.color.gray100};
`;
