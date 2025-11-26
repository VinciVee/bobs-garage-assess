import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const productGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: vars.space["2x"],
})
