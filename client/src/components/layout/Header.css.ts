import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const headerLayout = style({
  marginInline: vars.space["2x"],
  display: "flex",
  alignContent: "space-between",
  justifyContent: "center"
})
