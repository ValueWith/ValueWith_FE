import { useEffect, useRef } from 'react';

import Button from '@/components/Button';
import * as S from './SearchResultCard.styles';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface SearchResultCardProps {
  data: unknown[];
  handlePage: () => void;
}

function SearchResultCard({ data, handlePage }: SearchResultCardProps) {
  const target = useRef(null);

  const [observe, unobserve] = useIntersectionObserver(() => {
    handlePage();
  });

  useEffect(() => {
    if (target.current) {
      observe(target.current);

      return () => {
        unobserve(target.current);
      };
    }

    if (data.length === 0) {
      unobserve(target.current);
    }
  }, [data, target]);

  const handleSelectCard = (event: any) => {
    event.stopPropagation();
    console.log('click');
  };

  return (
    <S.SearchResultCardContainer>
      <ul>
        {data.map((item: any) => (
          <S.SearchResultCard
            key={item.id}
            onClick={() => {
              console.log('위경도');
            }}
          >
            {/* 카드 정보 */}
            <S.SearchResultCardInfo>
              <S.SearchResultCardHeading>
                {item.place_name}
              </S.SearchResultCardHeading>
              <S.SearchResultDetailInfo>
                <S.SearchResultCardCategory>
                  {item.category_group_name}
                </S.SearchResultCardCategory>
                <S.SearchResultCardAddress>
                  {item.address_name}
                </S.SearchResultCardAddress>
              </S.SearchResultDetailInfo>
            </S.SearchResultCardInfo>

            {/* 추가 버튼 */}
            <Button
              type="button"
              styleType="text"
              style={{ minWidth: 'auto' }}
              onClickHandler={handleSelectCard}
            >
              추가
            </Button>
          </S.SearchResultCard>
        ))}
      </ul>
      <span ref={target} style={{ width: '100%', height: 30 }} />
    </S.SearchResultCardContainer>
  );
}

export default SearchResultCard;
