import * as S from './ErrorMessage.styles';

interface ErrorMessageProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

function ErrorMessage({ children, className, ...style }: ErrorMessageProps) {
  return (
    <S.ErrorMessage className={className} {...style}>
      {children}
    </S.ErrorMessage>
  );
}

export default ErrorMessage;
