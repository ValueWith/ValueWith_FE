import * as S from './CommunityCard.styles';

interface CommunityCardProps {
  title?: string;
  profileUrl?: string;
}

function CommunityCard({
  title = '서울 한옥에서 한복입고 사진찍는 거 어때?',
  profileUrl = 'https://source.unsplash.com/random',
}: CommunityCardProps) {
  return (
    <S.CommunityCardContainer>
      {/* 오니지널 포스트 타이틀 / 후기 타이틀  */}
      <S.OriginPostTitle>{title}의 후기</S.OriginPostTitle>
      <S.CommunityCardTitle>경복궁에 다녀왔어요!</S.CommunityCardTitle>

      {/* 카드 컨텐츠  */}
      <S.CommunityCardContent>
        <S.CommunityCardContentContext>
          마음 맞는 사람만 있다면 한 번 또 가고 싶을 정도예요 이렇게 재미있는데
          저만 알기엔 너무 아까워서 후기사진
        </S.CommunityCardContentContext>
        <S.CommunityCardContentMore>더보기</S.CommunityCardContentMore>
      </S.CommunityCardContent>

      {/* 사용자 / 포스트 정보 */}
      <S.CommunityCardFooter>
        {/* 포스트 정보 */}
        <S.CommunityCardUserInfo>
          <S.ProfileImage src={profileUrl} alt="프로필 이미지" />
          <S.CommunityCardUser>
            <S.CommunityUserName>유진</S.CommunityUserName>
            <S.PostTime>36분 전</S.PostTime>
          </S.CommunityCardUser>
        </S.CommunityCardUserInfo>
        <S.CommunityCardPostInfo>
          좋아요&nbsp;3&nbsp;&#183;&nbsp;댓글&nbsp;0
        </S.CommunityCardPostInfo>
      </S.CommunityCardFooter>
    </S.CommunityCardContainer>
  );
}

export default CommunityCard;
