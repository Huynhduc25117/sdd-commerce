import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.jsx";
import { CommerceProvider } from "./context/CommerceContext";

const theme = createTheme({
  palette: {
    primary: { main: "#1769e0", dark: "#0d47a1" },
    secondary: { main: "#0f172a" },
    background: { default: "#f6f8fb", paper: "#ffffff" },
    text: { primary: "#172033", secondary: "#64748b" }
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    button: { textTransform: "none", fontWeight: 700 }
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiCard: { styleOverrides: { root: { border: "1px solid #e8edf4" } } }
  }
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CommerceProvider>
        <App />
      </CommerceProvider>
    </ThemeProvider>
  </React.StrictMode>
);
