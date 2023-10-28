import styled from '@emotion/styled';

export const TripCardContainer = styled.div`
  /* width: 285px; grid 때문에 삭제 */
  height: 380px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.03);
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
    background-color: ${(props) => props.theme.color.primary};
    color: white;
    font-size: 15px;
    font-weight: bold;
    padding: 12px 14px;
    border-radius: 4px;
  }
`;

export const CardTumbnail = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
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
  padding: 4px 14px;
  margin-right: 5px;
  font-size: 13px;
  color: ${(props) => props.theme.color.primary};
  background-color: white;
  border: 1px solid ${(props) => props.theme.color.primary};
  border-radius: 24px;
  > svg {
    font-size: 18px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
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
`;

export const DetailContent = styled.span`
  color: #707070;
`;

export const Content = styled.p`
  width: calc(100% - 24px);
  font-size: 13px;
  color: #707070;
  letter-spacing: -0.65px;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 8px;
  left: 13px;
  > span {
    font-size: 14px;
    letter-spacing: -0.7px;
    color: #1c1c1c;
  }
`;

export const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 9px;
  border-radius: 100%;
`;