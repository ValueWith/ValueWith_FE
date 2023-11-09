import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const SearchBarContainer = styled.div`
  .registSearch {
    &:focus-within {
      border: 1px solid ${theme.color.gray200};
    }
  }
  .searchIcon {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
