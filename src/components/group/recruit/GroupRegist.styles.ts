import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const GroupRegistContainer = styled.div`
  position: relative;
  width: 450px;
  min-width: 450px;
  height: 100%;
  border-right: 1px solid #e3e3e3;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .registGroup {
    position: sticky;
    top: 0;
    padding: 28px 28px 0;
    background-color: #fff;
    z-index: 3;
  }
`;

export const GroupRegistFormWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const GroupItemCardContainer = styled.div`
  width: 100%;
  margin-top: 28px;
  padding: 0 28px;
`;
