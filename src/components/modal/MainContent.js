import React from 'react';
import {
  ModalBody,
  ModalHeader,
  Text,
  UnorderedList,
  ListItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from '@chakra-ui/react';

import dollarFormatter from '../../utils/dollarFormatter';

const MainContent = ({
  productTotal,
  sumOfCoinsInserted,
  productOrder,
  error,
}) => {
  return (
    <>
      <ModalBody>
        {error.inventory ? (
          <>
            <Box mt={10} mb={6} bg="tomato" borderRadius="5px" color="white">
              <ModalHeader>There's an issue with your order.</ModalHeader>
            </Box>
            <Text ml={3}>
              These drinks are sold out, your purchase cannot be processed!
            </Text>
          </>
        ) : error.payment ? (
          <>
            <Box mt={10} mb={6} bg="tomato" borderRadius="5px" color="white">
              <ModalHeader>There's an issue with your order.</ModalHeader>
            </Box>
            <Text ml={3}>
              The total coins you inserted (
              {dollarFormatter(sumOfCoinsInserted)}) is not enough to cover this
              order ({dollarFormatter(productTotal)}).
            </Text>
          </>
        ) : (
          <>
            <Box mt={10} mb={6} bg="teal" borderRadius="5px" color="white">
              <ModalHeader>Your order is ready!</ModalHeader>
            </Box>
            <Box ml={3}>
              <Text>
                Change due: {dollarFormatter(sumOfCoinsInserted - productTotal)}
              </Text>
              <Text>Order details:</Text>
              <UnorderedList pl={2}>
                {productOrder.coke && (
                  <ListItem>Coke x {productOrder.coke}</ListItem>
                )}
                {productOrder.pepsi && (
                  <ListItem>Pepsi x {productOrder.pepsi}</ListItem>
                )}
              </UnorderedList>
            </Box>
          </>
        )}
      </ModalBody>
    </>
  );
};

export default MainContent;
