import * as S from './SuggestLabel.styles';

interface SuggestLabelProps {
  label: string;
  className?: string;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SuggestLabel({ label, className, onClickHandler }: SuggestLabelProps) {
  return (
    <S.SuggestionLabel className={className} onClick={onClickHandler}>
      {label}
    </S.SuggestionLabel>
  );
}

export default SuggestLabel;
