import React from "react";

import AppRoutes from "./AppRoutes";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { SocketProvider } from "./SocketProvider";


// Material UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#88ebe6",
    },
    secondary: {
      main: "#571122",
    },
  },
  typography: {
    fontFamily: "DMSerifDisplay",
    h4: {
      fontFamily: ['Chalkduster', 'Bradley Hand']
    }
  },
  
});

const App = () => {
  return (
    <div className="border-container">
      <div className="border">
        <SocketProvider>
          <ThemeProvider theme={theme}>
            <div >
              <AppRoutes />
            </div>
          </ThemeProvider>
        </SocketProvider>
      </div>
    </div>
  );
};

export default App;
