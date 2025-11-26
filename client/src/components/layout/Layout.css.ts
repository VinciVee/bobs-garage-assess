import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const app = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: vars.colors.primary,
  color: vars.colors.complementary,
  fontFamily: vars.fonts.body,
})

export const appContent = style({
  margin: vars.space["5x"],
  flex: 1,
});
