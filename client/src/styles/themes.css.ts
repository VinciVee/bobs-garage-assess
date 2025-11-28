import { createGlobalTheme, createTheme, createThemeContract } from "@vanilla-extract/css"
import twColors from "tailwindcss/colors.js"

const root = createGlobalTheme(":root", {
  // Creating semantic tokens
  fonts: {
    brand: "Oswald, apple-system, serif",
    body: "Inter, apple-system, sans-serif"
  },
  space: {
    none: '0',
    '1x': '0.5rem',
    '2x': '1rem',
    '3x': '1.5rem',
    '4x': '2rem',
    '5x': '2.5rem',
    '6x': '3rem',
  },
  fontSizes: {
    bodySmall: '0.83rem',
    bodyText: '1rem',
    bodyBig: '1.2rem',
    title5: '1.5rem',
    title4: '1.75rem',
    title3: '2rem',
    title2: '2.5rem',
    title1: '3rem',
  },
  fontWeights: {
    light: "300",
    regular: "400",
    medium: "500",
    semiBold: "600",
    bold: "700",
  }
})

const colors = createThemeContract({
  // SEMANTIC TOKENS
  // 70% of the color - based on light/dark mode
  primary: null,
  // Text, complements primary
  complementary: null,
  // also called 'accent' - 5% of website, used for emphasis or add splash of colour
  brand: null,
  brandLight: null,
  brandDark: null,

  // Color tokens
  success: null,
  warning: null,
  error: null,
  grey200: null,
  grey300: null,
  grey400: null,
  grey500: null,
  grey600: null,
  grey900: null,
})

export const lightTheme = createTheme(colors, {
  primary: twColors.white,
  complementary: twColors.slate[900],
  brand: twColors.sky[700],
  brandLight: twColors.sky[400],
  brandDark: twColors.sky[900],

  success: twColors.emerald[600],
  warning: twColors.orange[600],
  error: twColors.red[600],
  grey200: twColors.gray[200],
  grey300: twColors.gray[300],
  grey400: twColors.gray[400],
  grey500: twColors.gray[500],
  grey600: twColors.gray[600],
  grey900: twColors.gray[900],
})

export const darkTheme = createTheme(colors, {
  primary: twColors.slate[900],
  complementary: twColors.white,
  brand: twColors.sky[600],
  brandLight: twColors.sky[300],
  brandDark: twColors.sky[800],

  success: twColors.emerald[600],
  warning: twColors.orange[600],
  error: twColors.red[600],
  grey200: twColors.gray[200],
  grey300: twColors.gray[300],
  grey400: twColors.gray[400],
  grey500: twColors.gray[500],
  grey600: twColors.gray[600],
  grey900: twColors.gray[900],
})

export const vars = { ...root, colors }
