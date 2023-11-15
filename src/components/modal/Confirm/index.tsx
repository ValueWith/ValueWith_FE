import * as S from '../styles.ts';
import { ModalModel } from '@/recoil/modalState.ts';

const ConfirmModal = ({
  title,
  message,
  children,
  confirmType = 'confirm',
  confirmText = '확인',
  cancelText = '취소',
  alignType = 'top',
  onCancel,
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
          <S.CancelButton onClick={onCancel}>{cancelText}</S.CancelButton>
          <S.ConfirmButton onClick={onConfirm} confirmType={confirmType}>
            {confirmText}
          </S.ConfirmButton>
        </S.ButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default ConfirmModal;
