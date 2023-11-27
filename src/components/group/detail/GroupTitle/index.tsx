import { useNavigate } from 'react-router-dom';

import { FaChevronLeft } from 'react-icons/fa';
import * as S from './GroupTitle.styles';

interface GroupTitleProps {
  title: string;
}

function GroupTitle({ title }: GroupTitleProps) {
  const navigate = useNavigate();

  const handleClickPrevios = () => {
    navigate(-1);
  };

  return (
    <S.GroupTitleContainer onClick={handleClickPrevios}>
      <S.PreviousButton>
        <FaChevronLeft />
      </S.PreviousButton>
      <S.GroupTitle>{title}</S.GroupTitle>
    </S.GroupTitleContainer>
  );
}

export default GroupTitle;
