import styled from '@emotion/styled';

export const AlarmCardContainer = styled.div`
  width: 100%;
  height: 72px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AlarmCardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const AlarmCardGroupName = styled.p`
  font-size: 14px;
  color: #222222;
  font-weight: 600;
`;

export const AlarmCardContent = styled.div`
  font-size: 14px;
  color: #222222;
  display: flex;
  align-items: center;
`;

export const AlarmCardDate = styled.p`
  font-size: 11px;
  color: #9a9a9a;
`;
