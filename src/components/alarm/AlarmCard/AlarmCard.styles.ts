import styled from '@emotion/styled';

export const AlarmCardContainer = styled.div`
  width: 100%;
  height: 72px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #f6f6f6;
  }
`;

export const AlarmCardContentContainer = styled.div`
  width: 205px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const AlarmCardGroupName = styled.span`
  font-size: 14px;
  color: #222222;
  font-weight: 600;

  &.checked {
    color: #cccccc;
  }
`;

export const AlarmCardContent = styled.div`
  font-size: 14px;
  color: #222222;
  align-items: center;

  &.checked {
    color: #cccccc;
  }
`;

export const AlarmCardDate = styled.p`
  font-size: 11px;
  color: #9a9a9a;

  &.checked {
    color: #cccccc;
  }
`;
