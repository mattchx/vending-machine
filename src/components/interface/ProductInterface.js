import { useState, useEffect } from 'react';
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

const ProductInterface = ({ handleProduct }) => {
  const emptyProductOrder = {
    coke: '',
    pepsi: '',
  };
  const [productOrder, setProductOrder] = useState(emptyProductOrder);

  const calcProductTotal = () => {
    return productOrder.coke * 25 + productOrder.pepsi * 36;
  };

  useEffect(() => {
    handleProduct(productOrder, calcProductTotal());
  }, [productOrder]);

  const resetState = () => {
    setProductOrder(emptyProductOrder)
  }

  return (
    <>
      <Box mr={3}>
        <Flex align="center" justify="space-around">
          <Text>Coke(5): 25¢</Text>
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
          <Text>Pepsi(15): 36¢</Text>
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
