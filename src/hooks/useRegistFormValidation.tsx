import { FieldValues, UseFormTrigger } from 'react-hook-form';

interface useRegistFormValidationProps {
  trigger: UseFormTrigger<FieldValues>;
}

function useRegistFormValidation({ trigger }: useRegistFormValidationProps) {
  const handleFormValidate = (data: any, event?: React.KeyboardEvent) => {
    if (event && event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      trigger();
    }
  };

  return {
    handleFormValidate,
  };
}

export default useRegistFormValidation;
