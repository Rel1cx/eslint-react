import { createGlobalTheme, createVar } from "@vanilla-extract/css";

export const desktopBreakpoint = createVar();
export const lineHeightRelaxed = createVar();

export const vars = createGlobalTheme(":root", {
  font: {
    family: {
      fontFamilyBody: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', 'Noto Color Emoji'`,
      // fontFamilyHeading: 'Source Serif Pro'
    },
    size: {
      fontSize0: "0.8rem",
      fontSize1: "1rem",
      fontSize2: "1.25rem",
      fontSize3: "1.563rem",
      fontSize4: "1.953rem",
      fontSize5: "2.441rem",
      fontSize6: "3.052rem",
      fontSize7: "3.815rem",
      fontSizeRoot: "16px",
    },
    weight: {
      fontWeightBlack: "900",
      fontWeightBold: "700",
    },
  },
  colors: {
    background: "#f1f2f2",
    blue: "#00B8FF",
    hover: "#ececec",
    overlay: "rgba(0, 0, 0, 0.15)",
    primary: "#4733BC",
    secondary: "#654ea3",
    selected: "rgba(66, 133, 244, 1.000)",
    text: "#333333",
  },
  spacing: {
    spacing0: "0",
    spacing1: "0.25rem",
    spacing2: "0.5rem",
    spacing3: "0.75rem",
    spacing4: "1rem",
    spacing5: "1.25rem",
    spacing6: "1.5rem",
    spacing8: "2.0rem",
    spacing12: "3.0rem",
    spacingPx: "1px",
  },
});
