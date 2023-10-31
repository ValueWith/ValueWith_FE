import TripList from '@/components/TripList';
import * as S from './Home.styles';

function Home() {
  return (
    <S.HomeMainContainer>
      <S.Banner />
      <S.TitleContainer>
        <S.Title>카테고리 이름</S.Title>
        <S.Link>더 많은 일정 확인하기 &gt;</S.Link>
      </S.TitleContainer>
      <TripList pageName={'Home'}/>
    </S.HomeMainContainer>
  );
}

export default Home;
