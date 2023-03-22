import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store.js';
import App from './app/App';
import { BrowserRouter as Router } from 'react-router-dom';

// SOCKET
// import socket from 'socket.io-client'
// const clientSocket = socket(window.location.origin); 
// /* 
//   Never seen window.location before? This object describes the URL of the page we're on! 
// */ 

// clientSocket.on('connect', () => { 
//   console.log('Connected to server'); 
// })



const root = createRoot(document.getElementById('app'));

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
