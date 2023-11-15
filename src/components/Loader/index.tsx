import { Oval } from 'react-loader-spinner';
import theme from '@assets/styles/theme';

import * as S from './Loader.styles';

export interface LoaderCSSProps {
  // loader dimmed layer color
  // default: transparent / white / black
  bgColor?: string;
}

interface LoaderProps extends LoaderCSSProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

function Loader({
  width = 40,
  height = 40,
  bgColor,
  style,
  className,
}: LoaderProps) {
  return (
    <S.LoaderContainer bgColor={bgColor} style={style} className={className}>
      <Oval
        width={width}
        height={height}
        color={theme.color.primary}
        wrapperStyle={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={theme.color.secondary}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </S.LoaderContainer>
  );
}

export default Loader;
