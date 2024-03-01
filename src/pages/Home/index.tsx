import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { paramsState } from '@/recoil/paramsState';

import HomeTripList from '@/components/home/HomeTripList';

import * as S from './Home.styles';
import theme from '@/assets/styles/theme';
import { SkeletonImage } from '@/components/common/SkeletonImage';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const setParams = useSetRecoilState(paramsState);
  const [isImgLoading, setIsImgLoading] = useState(true);

  const handleGroup = () => {
    setParams({
      page: '1',
      status: 'all',
      area: 'all',
      sort: 'latest',
      title: '',
    });
  };

  return (
    <S.HomeMainContainer>
      <S.Banner>
        {isImgLoading && <SkeletonImage />}
        <img
          src="https://d1ywfj3yqlokxn.cloudfront.net/banner/banner.png"
          alt="배너 이미지"
          onLoad={() => setIsImgLoading(false)}
          style={{ display: isImgLoading ? 'none' : 'block' }}
        />
      </S.Banner>

      <S.TitleContainer>
        <S.Title>
          <span
            className="mr-2"
            style={{
              color: `${theme.color.primary}`,
              fontWeight: 'bold',
            }}
          >
            NEW!
          </span>
          최근 등록된 여행 그룹
        </S.Title>

        <S.Link
          onClick={() => {
            navigate('/group');
            handleGroup();
          }}
        >
          더 많은 그룹 확인하기 &gt;
        </S.Link>
      </S.TitleContainer>
      <HomeTripList />
    </S.HomeMainContainer>
  );
}

export default Home;
