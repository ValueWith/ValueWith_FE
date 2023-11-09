import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const PaginationContainer = styled.div`
  max-width: 100%;
  margin: 50px auto 0 auto;
  .pagination {
    display: flex;
    gap: 8px;
    font-size: 16px;

    .previous,
    .next {
      background-color: ${theme.color.white};
      border: 0;
      font-weight: 700;
    }
    .active {
      background-color: ${theme.color.primary};
      > a {
        color: ${theme.color.white};
      }
    }
    li {
      background-color: ${theme.color.white};
      border: 1px solid ${theme.color.gray100};
      border-radius: 4px;
      > a {
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333749;
      }
    }
  }
`;
