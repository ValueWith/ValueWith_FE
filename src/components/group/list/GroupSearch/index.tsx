import React, { useRef } from 'react';

import Input from '@components/Input';

import { BsSearch } from 'react-icons/bs';
import * as S from './GroupSearch.styles';
import { useRecoilState } from 'recoil';
import { paramsState } from '@/recoil/paramsState';

function GroupSearch() {
  const [params, setParams] = useRecoilState(paramsState);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    if (inputRef.current !== null && inputRef.current !== undefined) {
      const searchTerm = inputRef.current.value;
      setParams({ ...params, title: searchTerm });
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
          defaultValue={params.title}
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
