import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import * as S from './Dropdown.styles';

export interface DropdownCSSProps {
  width?: string;
  height?: string;
  listWidth?: number;
}

interface DropdownProps extends DropdownCSSProps {
  listData: string[];
  placeholder: string;
  selectedItem: string;
  onSelectItem: (item: string) => void;
}

function Dropdown({
  width,
  height,
  listData,
  placeholder,
  selectedItem,
  onSelectItem,
}: DropdownProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [listWidth, setListWidth] = useState(0);

  useEffect(() => {
    if (listRef.current) {
      setListWidth(listRef.current.offsetWidth);
    }
  }, []);

  return (
    <S.DropdownContainer width={width} listWidth={listWidth}>
      <S.SelectedItem height={height}>
        <S.SelectedItemLabel onClick={() => setIsShow(!isShow)}>
          <span className={selectedItem ? '' : `text-[#828282]`}>
            {' '}
            {selectedItem ? selectedItem : placeholder}
          </span>
          <BiChevronDown className="dropdownIcon" />
        </S.SelectedItemLabel>
      </S.SelectedItem>

      <S.DropdownList ref={listRef} className={isShow ? 'show z-10' : ''}>
        {listData
          .filter((item) => item !== selectedItem)
          .map((item, index) => (
            <S.DropdownItem
              key={index}
              onClick={() => {
                setIsShow(false);
                onSelectItem(item);
              }}
            >
              {item}
            </S.DropdownItem>
          ))}
      </S.DropdownList>
    </S.DropdownContainer>
  );
}

export default Dropdown;