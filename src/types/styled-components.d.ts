import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [x: string]: Interpolation<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
      primary: string;
      primaryHover: string;

      secondary: string;
      secondaryHover: string;

      success: string;
      successHover: string;

      danger: string;
      dangerHover: string;

      warning: string;

      background: string;
     white: string;
      text: string;
      textLight: string;

      border: string;
    };
  }
}