//
import { style } from "@vanilla-extract/css"
import { vars } from "../../styles/themes.css"

export const dashboardLink = style({
  textDecoration: "none",
  display: "block",
  padding: "1rem",
  borderBottom: "3px solid blue",
  color: "darkorange",

  ":hover": {
    backgroundColor: vars.colors.grey900,
    color: "white",
    borderBottom: "3ox solid orangered"
  },
})


