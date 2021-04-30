import React from 'react';
import { ChakraProvider, Container, theme } from '@chakra-ui/react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container mt={24}>
        <Dashboard />
      </Container>
    </ChakraProvider>
  );
}

export default App;
