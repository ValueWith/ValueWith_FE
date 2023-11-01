import React, { useRef } from 'react';

import Input from '../Input';

import { BsSearch } from 'react-icons/bs';
import * as S from './GroupSearch.styles';

function GroupSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    if (inputRef.current !== null && inputRef.current !== undefined) {
      const searchTerm = inputRef.current.value;
      console.log('검색어:', searchTerm);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <S.GroupSearchContainer>
      <form className='relative' onSubmit={handleSubmit}>
        <Input
          inputType={'input'}
          name='searchGroup'
          placeholder='검색어를 입력하세요'
          ref={inputRef}
        />
        <S.SearchButton type='button' onClick={handleSearch}>
          <BsSearch />
        </S.SearchButton>
      </form>
    </S.GroupSearchContainer>
  );
}

export default GroupSearch;
