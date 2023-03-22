import React from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';

import { createTheme, ThemeProvider } from '@mui/material/styles'

// Material UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#88ebe6'
    },
    secondary: {
      main: '#e3787e'
    },
  },
  typography: {
    fontFamily: 'Ubuntu'
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Navbar />
      <AppRoutes />
    </div>
    </ThemeProvider>
  );
};

export default App;
