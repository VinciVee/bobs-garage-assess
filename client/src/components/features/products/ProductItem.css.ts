import { style } from "@vanilla-extract/css"
import { vars } from "../../../styles/themes.css"

export const cardContainer = style({
  width: "18rem",
  display: 'flex',
  justifyContent: "flex-start",
})

export const cardImage = style({
  alignSelf: "flex-start",
  width: "100%",
  height: "250px",
  objectFit: "cover",
  objectPosition: "top center",
})

export const cardTitle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: vars.space["2x"],
})

export const overlay = style({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-start",
})

export const adminBtn = style({
  border: 'none',
  background: 'none',
  padding: vars.space["1x"],
  margin: 0,
})

export const servPrice = style({
  color: vars.colors.grey400,
  marginBottom: vars.space["1x"],
})

export const favStar = style({
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  display: "inline-block",
  color: vars.colors.brand,
})
