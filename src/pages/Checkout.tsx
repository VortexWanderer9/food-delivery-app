import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useToast,
  HStack,
  Image,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../features/store';
import { clearCart } from '../features/cartSlice';
import { createOrderStart, createOrderSuccess, OrderStatus } from '../features/orderSlice';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface DeliveryDetails {
  address: string;
  phone: string;
  instructions: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  deliveryAddress: string;
  trackingNumber: string;
  estimatedDeliveryTime: string;
  createdAt: string;
  updatedAt: string;
}

export default function Checkout() {
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    address: '',
    phone: '',
    instructions: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to proceed with checkout',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    }
  }, [user, navigate, toast]);

  const handleDeliveryDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast({
        title: 'Authentication Required',
        description: 'Please login to place an order',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    setIsLoading(true);
    dispatch(createOrderStart());

    try {
      // In a real app, make API calls for payment processing and order creation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Transform CartItems to OrderItems by ensuring id is a string
      const orderItems: OrderItem[] = cartItems.map(item => ({
        ...item,
        id: item.id.toString() // Convert id to string
      }));

      const order: Order = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        items: orderItems,
        total: total + 5, // Including delivery fee
        status: 'confirmed' as OrderStatus,
        deliveryAddress: deliveryDetails.address,
        trackingNumber: Math.random().toString(36).toUpperCase().substr(2, 8),
        estimatedDeliveryTime: new Date(Date.now() + 45 * 60000).toLocaleTimeString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch(createOrderSuccess(order));
      dispatch(clearCart());

      toast({
        title: 'Order Placed Successfully!',
        description: `Your order #${order.trackingNumber} has been confirmed.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate(`/track-order/${order.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to place your order. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  // Don't render the form if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <Container maxW="7xl" pt={{ base: '70px', md: '100px' }}>
      <form onSubmit={handleSubmit}>
        <Grid
          templateColumns={{ base: '1fr', md: '2fr 1fr' }}
          gap={8}
          alignItems="start"
        >
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack spacing={8} align="stretch">
                <Heading size="lg">Delivery Details</Heading>

                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Delivery Address</FormLabel>
                    <Input
                      name="address"
                      value={deliveryDetails.address}
                      onChange={handleDeliveryDetailsChange}
                      placeholder="Enter your full address"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      name="phone"
                      value={deliveryDetails.phone}
                      onChange={handleDeliveryDetailsChange}
                      placeholder="Enter your phone number"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Delivery Instructions</FormLabel>
                    <Input
                      name="instructions"
                      value={deliveryDetails.instructions}
                      onChange={handleDeliveryDetailsChange}
                      placeholder="Any special instructions for delivery"
                    />
                  </FormControl>
                </VStack>

                <Divider />

                <Box>
                  <Heading size="md" mb={4}>
                    Payment Method
                  </Heading>
                  <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                    <Stack spacing={4}>
                      <Radio value="card">Credit/Debit Card</Radio>
                      <Radio value="cash">Cash on Delivery</Radio>
                    </Stack>
                  </RadioGroup>
                </Box>
              </VStack>
            </MotionBox>
          </GridItem>

          <GridItem>
            <Box
              position="sticky"
              top="100px"
              bg={useColorModeValue('white', 'gray.800')}
              p={6}
              rounded="lg"
              shadow="md"
            >
              <VStack spacing={6} align="stretch">
                <Heading size="md">Order Summary</Heading>

                <VStack spacing={4} align="stretch">
                  {cartItems.map((item) => (
                    <HStack key={item.id} justify="space-between">
                      <HStack spacing={4}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          boxSize="50px"
                          objectFit="cover"
                          rounded="md"
                        />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{item.name}</Text>
                          <Text color="gray.500" fontSize="sm">
                            Qty: {item.quantity}
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontWeight="medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                    </HStack>
                  ))}
                </VStack>

                <Divider />

                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text>Subtotal</Text>
                    <Text>${total.toFixed(2)}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Delivery Fee</Text>
                    <Text>$5.00</Text>
                  </HStack>
                  <Divider />
                  <HStack justify="space-between" fontWeight="bold">
                    <Text>Total</Text>
                    <Text color="brand.500">${(total + 5).toFixed(2)}</Text>
                  </HStack>
                </VStack>

                <Button
                  type="submit"
                  colorScheme="brand"
                  size="lg"
                  isLoading={isLoading}
                >
                  Place Order
                </Button>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </form>
    </Container>
  );
} 