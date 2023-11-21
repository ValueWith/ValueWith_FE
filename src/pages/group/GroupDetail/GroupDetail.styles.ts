import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const GroupDetailContainer = styled.div`
  width: 100%;
`;

export const GroupThumbnail = styled.img`
  width: 100%;
  height: 313px;
  border-radius: 4px;
  object-fit: cover;
  margin-top: 17px;
`;

export const GroupContentContainer = styled.div`
  display: grid;
  grid-template-columns: 232px 1fr;
  gap: 11px;
  margin-top: 32px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 1열로 변경 */
    margin: 0;
  }
`;

export const GroupContent = styled.pre`
  border-top: 1px solid ${theme.color.gray100};
  padding: 32px 0;
  font-size: 14px;
  letter-spacing: -0.7px;
  color: #595f63;
  font: inherit;
`;
