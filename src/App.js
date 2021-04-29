import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Flex,
  Container,
  Center,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container mt={24}>
        <Center>
          <Dashboard />
        </Center>
      </Container>
    </ChakraProvider>
  );
}

export default App;
