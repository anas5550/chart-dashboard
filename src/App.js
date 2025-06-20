import React from 'react';
import AppRouter from './routes/AppRouter';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
const App = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppRouter />
      </MantineProvider>
    </>
  );
};

export default App;
