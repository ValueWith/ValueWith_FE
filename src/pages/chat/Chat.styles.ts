import styled from '@emotion/styled';

export const ChatContainer = styled.div`
  width: 100%;
  height: 830px;
  display: grid;
  grid-template-columns: 322px 1fr;
  border: 1px solid #e0e0e0;

  @media (max-width: 800px) {
    grid-template-columns: 1fr; /* 1열로 변경 */
  }
`;
