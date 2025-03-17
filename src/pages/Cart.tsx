import React from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  IconButton,
  Divider,
  useColorModeValue,
  useToast,
  Icon,
  Flex,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { FaPlus, FaMinus, FaTrash, FaArrowRight, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { removeItem, updateQuantity, clearCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../features/cartSlice';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionVStack = motion(VStack);

// Animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2
    }
  }
};

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (itemId: string | number, change: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
      } else {
        handleRemoveItem(itemId);
      }
    }
  };

  const handleRemoveItem = (itemId: string | number) => {
    dispatch(removeItem(itemId));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right"
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast({
      title: "Cart cleared",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top-right"
    });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Box minH="100vh" pt="80px">
      <Container maxW="7xl">
        <MotionVStack
          spacing={8}
          align="stretch"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              bgGradient="linear(to-r, brand.400, purple.400, blue.400)"
              bgClip="text"
            >
              Your Cart
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.200')} fontSize="lg">
              {cartItems.length > 0
                ? `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`
                : 'Your cart is empty'}
            </Text>
          </VStack>

          {cartItems.length > 0 ? (
            <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
              {/* Cart Items */}
              <VStack flex="2" spacing={6} align="stretch">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <MotionFlex
                      key={item.id}
                      variants={itemVariant}
                      layout
                      bg={bgColor}
                      p={4}
                      rounded="xl"
                      shadow="md"
                      borderWidth="1px"
                      borderColor={borderColor}
                      direction={{ base: 'column', sm: 'row' }}
                      align="center"
                      justify="space-between"
                      gap={4}
                      _hover={{ shadow: 'lg' }}
                      transition="all 0.3s ease"
                    >
                      {/* Item Image */}
                      <Box
                        w={{ base: 'full', sm: '120px' }}
                        h={{ base: '120px', sm: '120px' }}
                        rounded="lg"
                        overflow="hidden"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          w="full"
                          h="full"
                          objectFit="cover"
                          transition="transform 0.3s ease"
                          _hover={{ transform: 'scale(1.05)' }}
                        />
                      </Box>

                      {/* Item Details */}
                      <VStack
                        flex="1"
                        align={{ base: 'center', sm: 'start' }}
                        spacing={2}
                      >
                        <Heading size="md" noOfLines={1}>
                          {item.name}
                        </Heading>
                        <Text color="gray.500" fontSize="sm" noOfLines={2}>
                          {item.description}
                        </Text>
                        <HStack>
                          <Badge colorScheme="brand" px={2} rounded="full">
                            {item.category}
                          </Badge>
                          {item.isSpicy && (
                            <Badge colorScheme="red" px={2} rounded="full">
                              Spicy
                            </Badge>
                          )}
                        </HStack>
                      </VStack>

                      {/* Quantity Controls */}
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Decrease quantity"
                          icon={<Icon as={FaMinus} />}
                          size="sm"
                          variant="outline"
                          colorScheme="brand"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        />
                        <Text fontWeight="bold" minW="40px" textAlign="center">
                          {item.quantity}
                        </Text>
                        <IconButton
                          aria-label="Increase quantity"
                          icon={<Icon as={FaPlus} />}
                          size="sm"
                          variant="outline"
                          colorScheme="brand"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        />
                      </HStack>

                      {/* Price and Remove */}
                      <VStack spacing={2} align={{ base: 'center', sm: 'end' }}>
                        <Text
                          fontWeight="bold"
                          fontSize="lg"
                          color="brand.500"
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                        <Tooltip label="Remove item">
                          <IconButton
                            aria-label="Remove item"
                            icon={<Icon as={FaTrash} />}
                            size="sm"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleRemoveItem(item.id)}
                          />
                        </Tooltip>
                      </VStack>
                    </MotionFlex>
                  ))}
                </AnimatePresence>

                <Button
                  leftIcon={<Icon as={FaTrash} />}
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  alignSelf="start"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </VStack>

              {/* Order Summary */}
              <MotionBox
                variants={itemVariant}
                flex="1"
                bg={bgColor}
                p={6}
                rounded="xl"
                shadow="md"
                borderWidth="1px"
                borderColor={borderColor}
                position="sticky"
                top="100px"
                h="fit-content"
              >
                <VStack spacing={6} align="stretch">
                  <Heading size="lg">Order Summary</Heading>
                  <Divider />
                  <HStack justify="space-between">
                    <Text>Subtotal</Text>
                    <Text fontWeight="bold">${totalAmount.toFixed(2)}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Delivery Fee</Text>
                    <Text fontWeight="bold">$5.00</Text>
                  </HStack>
                  <Divider />
                  <HStack justify="space-between">
                    <Text fontWeight="bold" fontSize="lg">Total</Text>
                    <Text
                      fontWeight="bold"
                      fontSize="xl"
                      bgGradient="linear(to-r, brand.500, purple.500)"
                      bgClip="text"
                    >
                      ${(totalAmount + 5).toFixed(2)}
                    </Text>
                  </HStack>
                  <Button
                    size="lg"
                    colorScheme="brand"
                    rightIcon={<Icon as={FaArrowRight} />}
                    onClick={handleCheckout}
                    bgGradient="linear(to-r, brand.500, purple.500)"
                    _hover={{
                      bgGradient: "linear(to-r, brand.600, purple.600)",
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </VStack>
              </MotionBox>
            </Flex>
          ) : (
            <MotionBox
              variants={itemVariant}
              textAlign="center"
              py={12}
            >
              <Icon as={FaShoppingCart} boxSize={12} color="gray.400" mb={4} />
              <Text fontSize="xl" mb={4}>
                Your cart is empty
              </Text>
              <Button
                colorScheme="brand"
                onClick={() => navigate('/menu')}
                leftIcon={<Icon as={FaArrowRight} />}
                bgGradient="linear(to-r, brand.500, purple.500)"
                _hover={{
                  bgGradient: "linear(to-r, brand.600, purple.600)",
                }}
              >
                Browse Menu
              </Button>
            </MotionBox>
          )}
        </MotionVStack>
      </Container>
    </Box>
  );
} 