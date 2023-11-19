import { useEffect, useState } from 'react';

import { RiSearchLine } from 'react-icons/ri';
import * as S from './SearchBar.styles';
import Input from '../Input';
import { useLocation } from 'react-router-dom';

interface SearchBarProps {
  style?: React.CSSProperties;
  onSearchTermChange: (term: string) => void;
  defaultValue?: string;
}

function SearchBar({
  style,
  onSearchTermChange,
  defaultValue,
}: SearchBarProps) {
  const location = useLocation();

  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    setSearchValue(defaultValue || '');
  }, [defaultValue]);

  const handleSearchValue = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handleSearch = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLSpanElement>
  ) => {
    if (location.pathname === '/group/recruit') {
      if (!searchValue) return;
    }
    if ('key' in event && event.key === 'Enter') {
      onSearchTermChange(searchValue);
    } else if ('type' in event && event.type === 'click') {
      onSearchTermChange(searchValue);
    }
  };

  return (
    <S.SearchBarContainer>
      <Input
        inputType='input'
        name='registSearch'
        className='registSearch'
        placeholder='검색어를 입력해주세요'
        style={{
          height: '53px',
          paddingRight: '60px',
          fontSize: '17px',
          ...style,
        }}
        value={searchValue}
        onChange={handleSearchValue}
        onKeyDown={handleSearch}
      >
        <button type='button' className='searchIcon' onClick={handleSearch}>
          <RiSearchLine style={{ width: '40px', height: '40px' }} />
        </button>
      </Input>
    </S.SearchBarContainer>
  );
}

export default SearchBar;
