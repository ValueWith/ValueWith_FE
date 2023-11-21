import { useState } from 'react';
import * as S from './DropdownMenu.styles';

interface DropdownMenuProps {
  options: any;
  children: React.ReactNode;
  dropdownMunuStyle?: React.CSSProperties;
}

function DropdownMenu({
  options,
  dropdownMunuStyle,
  children,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (event: any, option: any) => {
    event.stopPropagation();
    option.onClickHandler();
  };

  return (
    <S.DropdownMenuContainer className="dropdown-menu">
      <div className="dropdown-menu__header" onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>
      {isOpen && (
        <S.DropdownMenuList
          className="dropdown-menu__list"
          style={dropdownMunuStyle}
        >
          {options.map((option: any, index: number) => (
            <S.DropdownMenuItem
              key={index}
              onClick={(event) => handleOptionClick(event, option)}
            >
              {option.label}
            </S.DropdownMenuItem>
          ))}
        </S.DropdownMenuList>
      )}
    </S.DropdownMenuContainer>
  );
}

export default DropdownMenu;
