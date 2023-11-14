import { ModalProps } from '@/hooks/useAuth';

export const handleFetchAction = (
  setIsLoading: (value: boolean) => void,
  setIsShowModal: (value: boolean) => void,
  setModalProps: (props: ModalProps) => void,
  successProps: ModalProps
) => {
  setIsLoading(false);
  setIsShowModal(true);
  setModalProps(successProps);
};
