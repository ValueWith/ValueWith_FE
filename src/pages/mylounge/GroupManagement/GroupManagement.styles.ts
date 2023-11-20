import styled from '@emotion/styled';
import theme from '@/assets/styles/theme';

export const GroupManagementContainer = styled.div`
  margin: 0 auto;
  padding-top: 55px;
`;

export const GroupManagementHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 0 50px;
  margin-bottom: 40px;
`;

export const GroupManagementHeading = styled.div`
  font-size: 25px;
  color: #bababa;
  cursor: pointer;

  &.active {
    color: #000;
    font-weight: 500;
  }
`;

export const GroupManagementContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
