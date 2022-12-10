import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { lime } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    check: {
      // light: "#757ce8",
      main: lime["800"],
      dark: lime["900"],
      contrastText: "#fff",
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
)
