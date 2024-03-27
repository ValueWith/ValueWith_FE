import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const CommunityCardContainer = styled.div`
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
`;

export const OriginPostTitle = styled.h2`
  font-size: 11px;
  margin-bottom: 4px;
`;

export const CommunityCardTitle = styled.h3`
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const CommunityCardContent = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 32px;
`;

export const CommunityCardContentContext = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #595f63;
`;

export const CommunityCardContentMore = styled.span`
  white-space: nowrap;
  font-weight: 600;
  align-self: flex-end;
  margin-left: 4px;
`;

export const CommunityCardFooter = styled.div`
  display: flex;
`;

export const CommunityCardUserInfo = styled.div`
  display: flex;
`;

export const CommunityCardUser = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommunityUserName = styled.p`
  font-size: 13px;
  line-height: 1.5;
`;

export const PostTime = styled.p`
  font-size: 11px;
  color: #707070;
  line-height: 1.5;
`;

export const ProfileImage = styled.img`
  width: 34px;
  min-width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #a3a3a3;
  margin-right: 6px;
`;

export const CommunityCardPostInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  font-size: 12px;
  color: #919293;
`;
