import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../styles/themes.css";

export const aboutPageStyle = style({})

globalStyle(`${aboutPageStyle} section`, {
  marginBottom: vars.space["4x"],
})

globalStyle(`${aboutPageStyle} h1`, {
  fontSize: vars.fontSizes.title3,
  marginBottom: vars.space["2x"],
})

globalStyle(`${aboutPageStyle} h2`, {
  fontSize: vars.fontSizes.title5,
  marginBottom: vars.space["1x"],
})

export const aboutText = style({
  marginBottom: vars.space["1x"],
  fontSize: vars.fontSizes.bodyText,
  width: 'clamp(45ch, 50%, 75ch)',
})

export const aboutRow = style({
  marginBottom: vars.space["3x"],
})

// export const staffRow = style({
//   gap: vars.space["2x"],
// })
