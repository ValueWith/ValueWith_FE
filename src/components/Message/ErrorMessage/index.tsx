import * as S from './ErrorMessage.styles';

interface ErrorMessageProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function ErrorMessage({ children, ...style }: ErrorMessageProps) {
  return <S.ErrorMessage {...style}>{children}</S.ErrorMessage>;
}

export default ErrorMessage;
