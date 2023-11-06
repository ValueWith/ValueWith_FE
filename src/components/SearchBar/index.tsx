import { useState } from 'react';

import { RiSearchLine } from 'react-icons/ri';
import Input from '../Input';

function SearchBar({
  onSearchTermChange,
}: {
  onSearchTermChange: (term: string) => void;
}) {
  const [searchValue, setSearchValue] = useState<string>('');

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
    if ('key' in event && event.key === 'Enter') {
      onSearchTermChange(searchValue);
    } else if ('type' in event && event.type === 'click') {
      onSearchTermChange(searchValue);
    }
  };

  return (
    <div>
      <Input
        inputType="input"
        name="registSearch"
        placeholder="검색어를 입력해주세요"
        style={{ paddingRight: '60px' }}
        value={searchValue}
        onChange={handleSearchValue}
        onKeyDown={handleSearch}
      >
        <span
          className="absolute right-[16px] cursor-pointer"
          onClick={handleSearch}
        >
          <RiSearchLine style={{ width: '40px', height: '40px' }} />
        </span>
      </Input>
    </div>
  );
}

export default SearchBar;
