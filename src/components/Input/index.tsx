import { forwardRef } from 'react';
import * as S from './Input.styles';

export interface InputCSSProps {
  readOnly?: boolean;
}
interface InputProps extends InputCSSProps {
  name: string;
  inputType: 'textarea' | 'input';
  type?: string; // text:default, password - input 타입에서 필수로 받아야 하는 값
  label?: string; // input에 라벨 표시해야 하는 경우 전달
  placeholder?: string; // input에 placeholder 표시해야 하는 경우 전달
  errors?: any; // errors,onChange는 useForm 에서 관리,  직접 Props로 넘겨주지 않음
  className?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

function Input(
  {
    type = 'text',
    inputType,
    name,
    label,
    placeholder,
    readOnly,
    className,
    onChange,
    errors,
  }: InputProps,
  ref: React.Ref<HTMLInputElement | HTMLTextAreaElement>
) {
  // 에러 메시지가 있는 경우 해당 에러 메시지를 errorKEY에 할당
  const errorKEY = errors?.[name as string]?.message as string;

  const inputCommonProps = {
    id: name,
    name: name,
    onChange: onChange,
    placeholder: placeholder,
    autoComplete: 'off',
  };

  return (
    <S.InputContainer>
      {label && <S.InputLabel htmlFor={name}>{label}</S.InputLabel>}
      <div>
        {inputType === 'textarea' ? (
          <S.Textarea
            className={errorKEY ? `error ${className}` : className}
            spellCheck="false"
            readOnly={readOnly}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...inputCommonProps}
          />
        ) : (
          <S.Input
            type={type}
            className={errorKEY ? `error ${className}` : className}
            spellCheck="false"
            readOnly={readOnly}
            ref={ref as React.Ref<HTMLInputElement>}
            {...inputCommonProps}
          />
        )}
      </div>
      {errorKEY && <S.InputErrorMessage>{errorKEY}</S.InputErrorMessage>}
    </S.InputContainer>
  );
}

export default forwardRef(Input);
