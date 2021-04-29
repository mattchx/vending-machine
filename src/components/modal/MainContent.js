import React from 'react';
import {
  ModalBody,
  ModalHeader,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

import dollarFormatter from '../../utils/dollarFormatter';

const MainContent = ({ productTotal, sumOfCoinsInserted, productOrder }) => {
  return (
    <>
      <ModalBody>
        <ModalHeader>Here you go:</ModalHeader>
        <Text>
          Your change due is :
          {dollarFormatter(sumOfCoinsInserted - productTotal)}
        </Text>
        <Text>Your order details:</Text>
        <UnorderedList>
          {productOrder.coke && <ListItem>Coke x {productOrder.coke}</ListItem>}
          {productOrder.pepsi && (
            <ListItem>Pepsi x {productOrder.pepsi}</ListItem>
          )}
        </UnorderedList>
      </ModalBody>
    </>
  );
};

export default MainContent;
