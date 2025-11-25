import { style } from "@vanilla-extract/css" //

export const cardSize = style({
  width: "18rem",
})

export const cardImage = style({
  width: "100%",
  height: "300px",
  objectFit: "cover",
  objectPosition: "top center",
})

export const favStar = style({
  marginLeft: "4em",
  display: "inline-block",
  marginTop: "2em",
})
