import React from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';

import { createTheme, ThemeProvider } from '@mui/material/styles'

import { SocketProvider } from './SocketProvider';
// SOCKET
// import socket from "socket.io-client";
// const clientSocket = socket.connect("http://localhost:8080")
// export const SocketContext = React.createContext(clientSocket);

// SOCKET
// import  socket from './socket';
//  import socket from "socket.io-client";

// export const SocketContext = React.createContext(socket);

// Material UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#88ebe6'
    },
    secondary: {
      main: '#571122'
    },
  },
  typography: {
    // fontFamily: 'Copperplate'
   fontFamily: 'Ubuntu',
  },
 
})

const App = () => {
  return (

    <div className='border-container'>
      <div className='border'>
    <SocketProvider >
    <ThemeProvider theme={theme}>
    <div >
      
      <Navbar />
      <AppRoutes />
    </div>
    </ThemeProvider>
    </SocketProvider>
    </div>
    </div>
  );
};

export default App;
