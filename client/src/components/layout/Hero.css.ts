import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const bgImage = style({
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "70vh",
  width: "100%",
})

export const overlay = style({
  textAlign: "center",
  color: vars.colors.complementary,
})
