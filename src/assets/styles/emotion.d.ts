import '@emotion/react';

interface LayoutComponentProps {
  header_height: number;
  footer_height: number;
}

type ColorProps = Color & {
  [key in keyof Color]: string;
};

declare module '@emotion/react' {
  export interface Theme {
    layoutComponent: LayoutComponentProps;
    color: ColorProps;
  }
}
