import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const headerLayout = style({
  marginInline: vars.space["5x"],
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "100%"
})

export const navCollapse = style({
  display: "flex",
  flexFlow: "row no-wrap",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: vars.space["1x"]
})

export const themeIcons = style({
  padding: 0,
  margin: 0
})

export const themeButton = style({
  background: "none",
  border: "none",
})
