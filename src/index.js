import React from "react"
import ReactDOM from "react-dom/client"

import { ThemeProvider } from "@emotion/react"

import App from "./App"
import theme from "./styles/theme"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // Removed <React.StrictMode> as it was cauding double renders on ComponentDidMount
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
