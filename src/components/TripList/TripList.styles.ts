import styled from '@emotion/styled';

export const TripListContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(282px, 1fr));
  justify-content: center;
  padding-bottom: 50px;
`;

export const NoTripList = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
