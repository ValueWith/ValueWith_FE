import { ChangeEvent } from 'react';

import * as S from './Radio.styles';
import { useLocation } from 'react-router-dom';

interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  styleType: 'radio' | 'card' | 'round';
  onChange: (value: string) => void;
}

function RadioGroup({
  options,
  selectedValue,
  styleType = 'radio',
  onChange,
}: RadioGroupProps) {
  const { pathname } = useLocation();

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={`flex flex-wrap items-center ${
        pathname.includes('community') ? 'gap-[4px]' : 'gap-5'
      }`}
    >
      {options.map((option) => (
        <S.Label key={option.value}>
          <S.Radio
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
            styleType={styleType}
          />
          <S.RadioText styleType={styleType}>{option.label}</S.RadioText>
        </S.Label>
      ))}
    </div>
  );
}

export default RadioGroup;
