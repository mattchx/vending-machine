import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  Spacer,
  Input,
  Lorem,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

// import PopUp from './PopUp';
import CoinInterface from './interface/CoinInterface';
import ProductInterface from './interface/ProductInterface';

const Dashboard = () => {
  const [coinsOnHand, setCoinsOnHand] = useState({
    pennies: 100,
    nickels: 10,
    dimes: 5,
    quarters: 25,
  });
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

  const [error, setError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitHandler = () => {
    console.log(sumOfCoinsInserted);
    onOpen(true);
  };

  const handleSetCoinTotal = total => {
    setSumOfCoinsInserted(total);
  };
  const handleSetProductTotal = total => {
    setProductTotal(total);
  };

  const dollarFormatter = cents => {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const resetDashboard = () => {
    setInsertedCoins(emptyInsertedCoins);
    setProductOrder(emptyProductOrder);
  };

  useEffect(() => {
    if (!isOpen) {
      resetDashboard();
    }
  }, [isOpen]);

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
        />

        <Text fontWeight="bold" mt={2}>
          PRODUCTS INFORMATION
        </Text>

        <Flex ml={3} align="center" justify="space-around">
          <ProductInterface
            handleSetProductTotal={handleSetProductTotal}
            productOrder={productOrder}
            setProductOrder={setProductOrder}
          />

          <Flex align="center" justify="space-between">
            <Text fontWeight="bold">Order Total:</Text>
            <Text>{productTotal && dollarFormatter(productTotal)}</Text>
          </Flex>
        </Flex>
        <Flex justify="flex-end">
          <Button onClick={submitHandler} colorScheme="orange">
            GET DRINKS
          </Button>
        </Flex>
      </Box>
      <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Here you go:</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Your order total is: {dollarFormatter(productTotal)}</Text>
              <Text>
                The value of coins inserted is:{' '}
                {dollarFormatter(sumOfCoinsInserted)}
              </Text>
              <Text>
                Your Change due is :{' '}
                {dollarFormatter(sumOfCoinsInserted - productTotal)}
              </Text>
            </ModalBody>
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
