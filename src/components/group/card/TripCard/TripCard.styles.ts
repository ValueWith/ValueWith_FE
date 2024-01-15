import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const TripCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  transition: all 0.3s;

  &:not(.mylounge) {
    height: 380px;
    cursor: pointer;
    &:hover {
      transform: scale(1.01);
    }
  }
`;

export const Closed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
  &::after {
    content: '마감된 일정입니다';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.color.gray600};
    color: ${theme.color.white};
    font-size: 15px;
    font-weight: bold;
    padding: 12px 14px;
    border-radius: 4px;
  }

  .mylounge & {
    height: calc(100% - 31px - 14px);
    /* content height: 30px, border: 1px, padding: 14px */
  }
`;

export const CardTumbnail = styled.img`
  width: 100%;
  min-height: 180px;
  max-height: 180px;
  object-fit: cover;

  .mylounge & {
    height: 180px;
    cursor: pointer;
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 14px;
  left: 12px;
  display: flex;
  align-items: center;
`;

export const Icon = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 12px;
  margin-right: 5px;
  font-size: 13px;
  color: ${theme.color.primary};
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.primary};
  border-radius: 24px;
  > svg {
    font-size: 18px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 14px 12px;
`;

export const Title = styled.h3`
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.9px;
  color: #3b3b3b;
  text-align: left;
`;

export const Detail = styled.div`
  display: flex;
  gap: 15px;
  letter-spacing: -0.7px;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const DetailTitle = styled.span`
  color: #1c1c1c;
  font-weight: 500;
`;

export const DetailContent = styled.span`
  color: #707070;
`;

export const Content = styled.p`
  width: calc(100% - 24px);
  height: 30px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #707070;
  letter-spacing: -0.65px;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  line-height: 15px;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

// 지원자 목록 div
export const ApplyListContainer = styled.div`
  width: 100%;
  padding: 17px 24px;
  margin-bottom: 2rem;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
`;

export const ApplyListTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #222222;
  letter-spacing: 0.32px;
  cursor: pointer;
`;

export const MemberListContainer = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  max-width: 1020px;
  margin: 10px auto 0 auto;
  > div {
    background-color: #f7f7f7;
    border-radius: 4px;
  }
`;
