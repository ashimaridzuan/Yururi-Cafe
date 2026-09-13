import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { ProgressProvider } from './context/ProgressContext';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
