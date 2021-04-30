import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Flex, useDisclosure } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';

import dollarFormatter from '../utils/dollarFormatter';
import MainContent from './modal/MainContent';
import CoinInterface from './interface/CoinInterface';
import ProductInterface from './interface/ProductInterface';

const Dashboard = () => {
  const [coinsOnHand, setCoinsOnHand] = useState([
    { 25: 25 },
    { 10: 5 },
    { 5: 10 },
    { 1: 100 },
  ]);
  const [remainingInventory, setRemainingInventory] = useState({
    coke: 5,
    pepsi: 15,
  });

  const emptyInsertedCoins = {
    pennies: '',
    nickels: '',
    dimes: '',
    quarters: '',
  };
  const emptyProductOrder = {
    coke: '',
    pepsi: '',
  };
  const [insertedCoins, setInsertedCoins] = useState(emptyInsertedCoins);
  const [productOrder, setProductOrder] = useState(emptyProductOrder);

  const [sumOfCoinsInserted, setSumOfCoinsInserted] = useState(0);
  const [productTotal, setProductTotal] = useState(0);

  const [error, setError] = useState({
    coin: false,
    product: false,
    inventory: false,
    payment: false,
    changeDue: false,
  });
  // to do - correct  validation handling

  const { isOpen, onOpen, onClose } = useDisclosure();

  const resetDashboard = () => {
    setInsertedCoins(emptyInsertedCoins);
    setProductOrder(emptyProductOrder);
  };

  const handleSetCoinTotal = total => {
    setSumOfCoinsInserted(total);
  };
  const handleSetProductTotal = total => {
    setProductTotal(total);
  };

  useEffect(() => {
    if (!isOpen) {
      resetDashboard();
    }
  }, [isOpen]);

  const submitHandler = () => {
    updateInventory();
    updateCoinsOnHand();
    onOpen(true);
  };

  const updateInventory = () => {
    if (sumOfCoinsInserted - productTotal < 0) {
      setError(state => ({ ...state, payment: true }));
      return;
    } else {
      setError(state => ({ ...state, payment: false }));
    }
    if (
      remainingInventory.pepsi - productOrder.pepsi < 0 ||
      remainingInventory.coke - productOrder.coke < 0
    ) {
      setError(state => ({ ...state, inventory: true }));
    } else {
      setError(state => ({ ...state, inventory: false }));
      setRemainingInventory(state => ({
        pepsi: state.pepsi - productOrder.pepsi,
        coke: state.coke - productOrder.coke,
      }));
    }
  };

  const updateCoinsOnHand = () => {
    //*** remove for testing ***/ /
    // if (error.inventory) return;
    let changeDue = sumOfCoinsInserted - productTotal;
    const sumOfCoinsOnHand = coinsOnHand.reduce((acc, next) => {
      return acc + parseInt(Object.keys(next)) * next[Object.keys(next)];
    }, 0);
    console.log('changeDue:', changeDue);
    console.log('sumOfCoinsOnHand:', sumOfCoinsOnHand);
    // check if total change due > sum of coins on hand
    if (changeDue > sumOfCoinsOnHand) {
      setError(state => ({ ...state, changeDue: true }));
      //*** remove for testing ***//
      return console.log('insufficent change');
    } else {
      setError(state => ({ ...state, changeDue: false }));
    }

    // how to remove coins from on hand
    console.log(changeDue);
    const updateCoinsArray = coinsOnHand.map((coin, i) => {
      const denom = parseInt(Object.keys(coin));
      const quantity = coin[denom];
      //console.log(typeof denom, typeof quantity);
      // how many times does changeDue go into denom
      const amount = Math.floor(changeDue / denom);
      console.log(amount);
      const updateAmount = amount > quantity ? quantity : amount;
      // take the updateAmount and remove it from changeDue
      changeDue -= updateAmount * denom;
      console.log(changeDue);

      return { [denom]: quantity - updateAmount };
    });
    console.log(coinsOnHand, updateCoinsArray);
    if (changeDue > 0) {
      setError(state => ({ ...state, changeDue: true }));
      console.log('insufficient change error');
      return;
    } else {
      setError(state => ({ ...state, changeDue: false }));
      setCoinsOnHand(updateCoinsArray);
      console.log(coinsOnHand);
      console.log('coins on hand successfully updated');
    }
    console.log(coinsOnHand, updateCoinsArray);
  };

  return (
    <>
      <Box
        p={4}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Text fontWeight="bold">COIN INFORMATION</Text>

        <CoinInterface
          handleSetCoinTotal={handleSetCoinTotal}
          insertedCoins={insertedCoins}
          setInsertedCoins={setInsertedCoins}
          setError={setError}
        />

        <Text fontWeight="bold" mt={2}>
          PRODUCTS INFORMATION
        </Text>

        <Flex ml={3} align="center" justify="space-around">
          <ProductInterface
            handleSetProductTotal={handleSetProductTotal}
            productOrder={productOrder}
            setProductOrder={setProductOrder}
            setError={setError}
            inventory={remainingInventory}
          />

          <Flex align="center" justify="space-between">
            <Text fontWeight="bold">Order Total:</Text>
            <Text>{productTotal && dollarFormatter(productTotal)}</Text>
          </Flex>
        </Flex>
        <Flex justify="flex-end">
          {!error.coin && !error.product ? (
            <Button onClick={submitHandler} colorScheme="orange">
              GET DRINKS
            </Button>
          ) : (
            <Button disabled colorScheme="orange">
              GET DRINKS
            </Button>
          )}
        </Flex>
      </Box>
      <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <MainContent
              productTotal={productTotal}
              sumOfCoinsInserted={sumOfCoinsInserted}
              productOrder={productOrder}
              error={error}
            />
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default Dashboard;
