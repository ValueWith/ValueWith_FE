import * as S from '../styles.ts';
import { ModalModel } from '@/recoil/modalState.ts';

const AlertModal = ({
  title,
  message,
  children,
  confirmType = 'confirm', //warning
  confirmText = '확인',
  alignType = 'top',
  onConfirm,
}: ModalModel) => {
  return (
    <S.ModalOverlay>
      <S.ModalContainer alignType={alignType}>
        <S.ModalHeader>{title}</S.ModalHeader>
        <S.ModalContent>
          {message}
          {children}
        </S.ModalContent>
        <S.ButtonContainer>
          <S.ConfirmButton onClick={onConfirm} confirmType={confirmType}>
            {confirmText}
          </S.ConfirmButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default AlertModal;
