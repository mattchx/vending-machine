import { useEffect, useState } from 'react';
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
import { set } from 'react-hook-form';

const CoinInterface = ({
  insertedCoins,
  setInsertedCoins,
  handleSetCoinTotal,
  setError,
}) => {
  const calcOrderTotal = () => {
    const arrOfCoins = Object.entries(insertedCoins);
    const total = arrOfCoins.reduce((acc, next) => {
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
    if (arrOfCoins.some(item => item[1] < 0) || total === 0) {
      setError(true);
      return 0;
    } else {
      setError(false);
      return total;
    }
  };
  useEffect(() => {
    handleSetCoinTotal(calcOrderTotal());
  }, [insertedCoins]);

  return (
    <>
      <Flex ml={3} align="center" justify="space-around">
        <Box mr={3}>
          <Text>Pennies 1¢</Text>
          <Input
            value={insertedCoins.pennies}
            onChange={e =>
              setInsertedCoins(state => ({
                ...state,
                pennies: e.target.value,
              }))
            }
            min="0"
            type="number"
            w={70}
          />
        </Box>
        <Box mr={3}>
          <Text>Nickels 5¢</Text>
          <Input
            value={insertedCoins.nickels}
            onChange={e =>
              setInsertedCoins(state => ({
                ...state,
                nickels: e.target.value,
              }))
            }
            min="0"
            type="number"
            w={70}
          />
        </Box>
        <Box mr={3}>
          <Text>Dimes 10¢</Text>
          <Input
            value={insertedCoins.dimes}
            onChange={e =>
              setInsertedCoins(state => ({
                ...state,
                dimes: e.target.value,
              }))
            }
            min="0"
            type="number"
            w={70}
          />
        </Box>
        <Box mr={3}>
          <Text>Quarters 25¢</Text>
          <Input
            value={insertedCoins.quarters}
            onChange={e =>
              setInsertedCoins(state => ({
                ...state,
                quarters: e.target.value,
              }))
            }
            min="0"
            type="number"
            w={70}
          />
        </Box>
      </Flex>
    </>
  );
};

export default CoinInterface;
