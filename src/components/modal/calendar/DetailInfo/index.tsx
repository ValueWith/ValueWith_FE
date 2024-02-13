import * as CS from '../../styles';
import * as S from './DetailInfo.styles';

interface DetailInfoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedDate: Date | null;
}

function DetailInfo({ open, setOpen, selectedDate }: DetailInfoProps) {
  return (
    open && (
      <CS.ModalOverlay>
        <S.DetailInfoContainer>
          <button type="button" onClick={() => setOpen(false)}>
            닫기
          </button>
          상세 정보
        </S.DetailInfoContainer>
      </CS.ModalOverlay>
    )
  );
}

export default DetailInfo;
