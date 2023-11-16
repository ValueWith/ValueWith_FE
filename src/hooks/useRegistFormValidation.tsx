import { FieldValues, UseFormSetError, UseFormTrigger } from 'react-hook-form';

interface useRegistFormValidationProps {
  trigger: UseFormTrigger<FieldValues>;
  setError: UseFormSetError<FieldValues>;
}

function useRegistFormValidation({
  trigger,
  setError,
}: useRegistFormValidationProps) {
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
