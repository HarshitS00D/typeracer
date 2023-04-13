import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none", // To not override button text case
    },
  },
})

export default theme
