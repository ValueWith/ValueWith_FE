import * as S from './Button.styles';

export interface ButtonCSSProps {
  size?: 'sm' | 'md' | 'lg'; // 버튼 사이즈, default: md
  styleType?:
    | 'basic'
    | 'solid'
    | 'outline'
    | 'outline-disabled'
    | 'disabled'
    | 'warning'
    | 'text'; // 버튼 디자인 타입, default: solid
  fullWidth?: boolean; // 버튼 가로 너비 100%, default: false
}

interface ButtonProps extends ButtonCSSProps {
  type?: 'button' | 'submit' | 'reset'; // 버튼 타입, default: submit
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClickHandler?: (
    e?: React.MouseEvent<HTMLButtonElement>,
    ...args: any[]
  ) => void;
}

function Button({
  children,
  style,
  className,
  type = 'submit',
  size = 'md',
  styleType = 'solid',
  fullWidth = false,
  onClickHandler,
}: ButtonProps) {
  return (
    <S.Button
      type={type}
      size={size}
      styleType={styleType}
      fullWidth={fullWidth}
      className={className}
      style={{
        ...style,
      }}
      onClick={onClickHandler}
    >
      {children}
    </S.Button>
  );
}

export default Button;
