import { ThemeProvider } from '@emotion/react';
import customTheme from './utils/CustomTheme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <React.StrictMode>
        <BrowserRouter>
          <DashboardLayout />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  );
};

export default App;