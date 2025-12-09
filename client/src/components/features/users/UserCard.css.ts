import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const userImg = style({
  objectFit: "cover",
})

export const userCard = style({
  border: "none",
  padding: "0 0 1rem 0",
  height: "75vh"
})

export const bioText = style({
  fontSize: vars.fontSizes.bodyText
})

export const roleText = style({
  fontSize: vars.fontSizes.bodySmall,
  color: vars.colors.grey600,
  paddingBottom: vars.space["1x"]
})
