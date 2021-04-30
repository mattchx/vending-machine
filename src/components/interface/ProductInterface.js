import { useState, useEffect } from 'react';
import { Box, Text, Flex, Spacer, Input } from '@chakra-ui/react';

const ProductInterface = ({
  productOrder,
  setProductOrder,
  handleSetProductTotal,
  setError,
  inventory,
}) => {
  const calcProductTotal = () => {
    if (
      productOrder.coke + productOrder.pepsi === 0 ||
      productOrder.coke < 0 ||
      productOrder.pepsi < 0 ||
      (productOrder.coke === '' && productOrder.pepsi === '')
    ) {
      setError(state => ({ ...state, product: true }));
      return 0;
    } else {
      setError(state => ({ ...state, product: false }));
      const total = productOrder.coke * 25 + productOrder.pepsi * 36;
      return total;
    }
  };

  useEffect(() => {
    handleSetProductTotal(calcProductTotal());
  }, [productOrder]);

  return (
    <>
      <Box mr={3}>
        <Flex align="center" justify="space-around">
          <Text>Coke({inventory.coke}): 25¢</Text>
          <Spacer w={7} />
          <Input
            value={productOrder.coke}
            onChange={e =>
              setProductOrder(state => ({
                ...state,
                coke: e.target.value,
              }))
            }
            min="0"
            type="number"
            w={70}
          />
        </Flex>

        <Flex align="center">
          <Text>Pepsi({inventory.pepsi}): 36¢</Text>
          <Spacer />
          <Input
            value={productOrder.pepsi}
            onChange={e =>
              setProductOrder(state => ({
                ...state,
                pepsi: e.target.value,
              }))
            }
            min="0"
            type="number"
            w={70}
          />
        </Flex>
      </Box>
    </>
  );
};

export default ProductInterface;
