import { style, globalStyle } from "@vanilla-extract/css" //
import { vars } from "../styles/themes.css"


export const bootRow = style({
  marginInline: "1rem",
})

export const homeContainer = style({
  margin: `${vars.space["1x"]} ${vars.space["3x"]}`
})

export const belowHeroContainer = style({

})

// export const imageBox = style({
//   width: "100%",
//   height: "300px",
//   objectFit: "cover",
//   objectPosition: "top center",
// })

export const favSection = style({

})

export const headings = style({
  fontFamily: vars.fonts.brand,
  fontWeight: vars.fontWeights.semiBold,
  fontSize: vars.fontSizes.title3,
  color: vars.colors.brand
})


