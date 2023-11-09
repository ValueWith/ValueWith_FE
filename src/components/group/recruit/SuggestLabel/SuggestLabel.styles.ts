import styled from '@emotion/styled';
import theme from '@/assets/styles/theme';

export const SuggestionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px 6px;
  padding: 0 28px;
  margin-top: 20px;
`;

export const SuggestionLabel = styled.button`
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 15px;
  border: 1px solid #f1f2f3;
  border-radius: 24px;
  color: ${theme.color.gray700};
  background-color: #f1f2f3;
  cursor: pointer;

  &.selected {
    border: 1px solid ${theme.color.primary};
    color: ${theme.color.primary};
    background-color: ${theme.color.secondary};
  }
`;
