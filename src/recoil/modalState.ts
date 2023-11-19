import { atom } from 'recoil';

interface ModalCSSProps {
  alignType?: 'center' | 'top'; // 모달 위치, default: center
  confirmType?: 'confirm' | 'warning'; // 모달 버튼 색상, default: confirm
}

export interface ModalModel extends ModalCSSProps {
  type?: 'alert' | 'confirm';
  isModalOpen?: boolean;
  title?: string;
  message: string; // 텍스트만 있는 경우 message
  confirmText?: string; // 확인 버튼 텍스트
  cancelText?: string; // 취소 버튼 텍스트
  children?: React.ReactNode; // 텍스트 외에 다른 컴포넌트가 있는 경우 children
  onConfirm: () => void; // 확인 버튼 클릭 시 실행할 함수
  onCancel?: () => void; // 취소 버튼 클릭 시 실행할 함수
}

export const modalState = atom<ModalModel>({
  key: 'modalState',
  default: {
    type: 'alert',
    title: '',
    message: '',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: () => {
      console.log('confirm');
    },
  },
});
