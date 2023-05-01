import { ThemeProvider } from '@emotion/react';
import customTheme from './utils/CustomTheme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <DashboardLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;