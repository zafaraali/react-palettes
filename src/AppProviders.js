import React from 'react';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

// Retain the original Material UI colors, font, and control proportions while
// moving components and custom styles onto the same Emotion styling engine.
const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' }
  },
  typography: { fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }
});

export default function AppProviders({ children }) {
  return <StyledEngineProvider injectFirst><ThemeProvider theme={theme}>{children}</ThemeProvider></StyledEngineProvider>;
}
