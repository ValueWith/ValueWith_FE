import * as CS from '@components/modal/styles';
import * as S from './DefaultModalTemplate.styles';
import Button from '@/components/common/Button';
import { AiOutlineClose } from 'react-icons/ai';

export interface DefaultModalTemplateCSSProps {
  modalWidth?: string;
  modalHeight?: string;
  isScroll?: boolean;
}

interface DefaultModalTemplateProps extends DefaultModalTemplateCSSProps {
  isOpen: boolean;
  className?: string;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

function DefaultModalTemplate({
  isOpen,
  setIsOpen,
  modalWidth,
  modalHeight,
  className,
  children,
}: DefaultModalTemplateProps) {
  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    isOpen && (
      <CS.ModalOverlay tabIndex={-1} onClick={() => setIsOpen(false)}>
        <S.DefaultModalContainer
          className={className}
          modalWidth={modalWidth}
          modalHeight={modalHeight}
          tabIndex={0}
          onClick={(event) => handleContainerClick(event)}
        >
          <Button
            type="button"
            styleType="text"
            style={{
              position: 'absolute',
              top: '13px',
              right: '13px',
              minWidth: 'auto',
              padding: '0',
              color: '#000',
            }}
            onClickHandler={() => setIsOpen(false)}
          >
            <AiOutlineClose size={24} />
          </Button>
          {children}
        </S.DefaultModalContainer>
      </CS.ModalOverlay>
    )
  );
}

export default DefaultModalTemplate;
