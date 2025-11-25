import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const footerBar = style({
  backgroundColor: vars.colors.brandDark,
  height: "3em",
  display: "flex",
  justifyContent: "center",
  alignContent: "center"
})
