import React, { useState } from 'react';
import { Box, Text, Button, Flex, Spacer, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const Dashboard = () => {
  const [inputedCoins, setInputedCoins] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);
  const [error, setError] = useState(false);
  //   let countTotal = 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    // for (let {key, value} of data.entries()) {
    //     const intNum = parseInt(value)
    //     if ( intNum < 0 || intNum % 1 !== 0) setError(true)
    // }
    // const coinsArray = Object.entries(data).map(e => ({ [e[0]]: parseInt(e[1]) }));
    console.log(data);
    setInputedCoins(data);
    setOrderTotal(calcTotal(data));
  };

  const calcTotal = data => {
    const total = Object.entries(data).reduce((acc, next) => {
      const key = next[0];
      const value = next[1];

      switch (key) {
        case 'pennies':
          return value * 1 + acc;
        case 'nickels':
          return value * 5 + acc;
        case 'dimes':
          return value * 10 + acc;
        case 'quarters':
          return value * 25 + acc;
        default:
          return 0;
      }
    }, 0);
    return total / 100;
  };

  return (
    <Box p={4} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontWeight="bold">COIN INFORMATION</Text>
        <Flex ml={3} align="center" justify="space-around">
          <Box mr={3}>
            <Text>Pennies 1¢</Text>
            <Input min="0" type="number" {...register('pennies')} w={70} />
          </Box>
          <Box mr={3}>
            <Text>Nickels 5¢</Text>
            <Input min="0" type="number" {...register('nickels')} w={70} />
          </Box>
          <Box mr={3}>
            <Text>Dimes 10¢</Text>
            <Input min="0" type="number" {...register('dimes')} w={70} />
          </Box>
          <Box mr={3}>
            <Text>Quarters 25¢</Text>
            <Input min="0" type="number" {...register('quarters')} w={70} />
          </Box>
        </Flex>

        <Text fontWeight="bold" mt={2}>
          PRODUCTS INFORMATION
        </Text>
        <Flex ml={3} align="center" justify="space-around">
          <Box mr={3}>
            <Flex align="center" justify="space-around">
              <Text>Coke</Text>
              <Spacer w={7} />
              <Input min="0" type="number" w={70} />
            </Flex>
            <Flex align="center">
              <Text>Pepsi</Text>
              <Spacer />
              <Input min="0" type="number" w={70} />
            </Flex>
          </Box>
          <Flex align="center" justify="space-between">
            <Text fontWeight="bold">Order Total:</Text>
            <Text>{orderTotal && orderTotal.toLocaleString("en-US", {style:"currency", currency:"USD"})}</Text>
          </Flex>
        </Flex>
        <Flex justify="flex-end">
          <Button type="submit" colorScheme="orange">
            GET DRINKS
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Dashboard;
