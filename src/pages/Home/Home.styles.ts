import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const HomeMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Banner = styled.div`
  width: 100%;
  border-radius: 4px;
  height: 313px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 60px 0 20px 0;
`;

export const Title = styled.p`
  font-size: 24px;
`;

export const Link = styled.a`
  font-size: 14px;
  color: ${theme.color.fontgray};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
