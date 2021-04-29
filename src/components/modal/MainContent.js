import React from 'react';
import { ModalBody, ModalHeader, Text } from '@chakra-ui/react';

import dollarFormatter from '../../utils/dollarFormatter';

const MainContent = ({ productTotal, sumOfCoinsInserted }) => {
  return (
    <>
      <ModalBody>
        <ModalHeader>Here you go:</ModalHeader>
        <Text>Your order total is: {dollarFormatter(productTotal)}</Text>
        <Text>
          The value of coins inserted is: {dollarFormatter(sumOfCoinsInserted)}
        </Text>
        <Text>
          Your Change due is :{' '}
          {dollarFormatter(sumOfCoinsInserted - productTotal)}
        </Text>
      </ModalBody>
    </>
  );
};

export default MainContent;
