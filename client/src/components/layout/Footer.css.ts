import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const footerBar = style({
  backgroundColor: vars.colors.brandDark,
  height: "auto",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  paddingBlock: vars.space["2x"],
})

globalStyle(`${footerBar} h2`, {
  fontSize: vars.fontSizes.bodyBig,
  marginBottom: vars.space["2x"],
})

globalStyle(`${footerBar} p`, {
  lineHeight: '1lh',
  marginBottom: vars.space.none,
})
