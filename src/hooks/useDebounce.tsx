import { useEffect, useState } from 'react';

interface useDebounceProps<T> {
  value: T;
  delay: number;
}

function useDebounce<T>({ value, delay }: useDebounceProps<T>) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
