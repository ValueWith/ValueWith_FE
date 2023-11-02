// RadioGroup.tsx
import React, { ChangeEvent } from 'react';
import * as S from './Radio.styles';

interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  styleType: 'radio' | 'card';
  onChange: (value: string) => void;
}

function RadioGroup({
  options,
  selectedValue,
  styleType = 'radio',
  onChange,
}: RadioGroupProps) {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className='flex flex-wrap gap-5 items-center'>
      {options.map((option) => (
        <S.Label key={option.value}>
          {styleType === 'radio' && (
            <>
              <S.Radio
                type='radio'
                value={option.value}
                checked={selectedValue === option.value}
                onChange={handleRadioChange}
              />
              <S.RadioText>{option.label}</S.RadioText>
            </>
          )}
          {styleType === 'card' && (
            <>
              <S.RadioCard
                type='radio'
                value={option.value}
                checked={selectedValue === option.value}
                onChange={handleRadioChange}
              />
              <S.RadioCardText>{option.label}</S.RadioCardText>
            </>
          )}
        </S.Label>
      ))}
    </div>
  );
}

export default RadioGroup;
