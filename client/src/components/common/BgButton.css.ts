import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/themes.css'

export const button = style({
  margin: vars.space['1x'],
  padding: `${vars.space['1x']} ${vars.space['3x']}`,
  color: vars.colors.primary,
  backgroundColor: vars.colors.complementary,
  borderRadius: 6,
  border: `2px ${vars.colors.complementary} solid`,
  textTransform: "uppercase",
  fontWeight: vars.fontWeights.semiBold,
  textAlign: "center",
  // fontFamily: vars.fonts.brand,

  ":hover": {
    color: vars.colors.complementary,
    backgroundColor: vars.colors.primary,
    border: `2px ${vars.colors.complementary} solid`,
  },
})
