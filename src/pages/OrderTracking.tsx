import React, { useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  useColorModeValue,
  Circle,
  Divider,
  Progress,
  Badge,
  SimpleGrid,
  Icon,
  Image,
  Button,
  Flex,
} from '@chakra-ui/react';
import {
  FaCheckCircle,
  FaHourglass,
  FaUtensils,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
  FaStar,
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/store';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionBadge = motion(Badge);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'yellow';
    case 'preparing':
      return 'orange';
    case 'out-for-delivery':
      return 'blue';
    case 'delivered':
      return 'green';
    default:
      return 'gray';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return FaCheckCircle;
    case 'preparing':
      return FaUtensils;
    case 'out-for-delivery':
      return FaMotorcycle;
    case 'delivered':
      return FaMapMarkerAlt;
    default:
      return FaHourglass;
  }
};

const getProgressValue = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 25;
    case 'preparing':
      return 50;
    case 'out-for-delivery':
      return 75;
    case 'delivered':
      return 100;
    default:
      return 0;
  }
};

// Animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const pulseVariant = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Mock order data
const orderData = {
  orderId: "ORD123456789",
  status: "preparing",
  estimatedDelivery: "30-40 minutes",
  restaurant: {
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    rating: 4.8,
    address: "123 Main St, New York, NY 10001",
    phone: "(123) 456-7890"
  },
  driver: {
    name: "John Smith",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    phone: "(123) 456-7890",
    rating: 4.9
  },
  items: [
    {
      id: 1,
      name: "Margherita Pizza",
      quantity: 2,
      price: 14.99,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      quantity: 1,
      price: 16.99,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e"
    }
  ],
  deliveryAddress: "456 Park Ave, Apt 7B, New York, NY 10022",
  orderProgress: 65
};

// Order status steps
const orderSteps = [
  {
    title: "Order Confirmed",
    icon: FaCheckCircle,
    completed: true
  },
  {
    title: "Preparing",
    icon: FaUtensils,
    completed: true
  },
  {
    title: "On the Way",
    icon: FaMotorcycle,
    completed: false
  },
  {
    title: "Delivered",
    icon: FaMapMarkerAlt,
    completed: false
  }
];

export default function OrderTracking() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const currentOrder = useSelector((state: RootState) => state.order.currentOrder);
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  useEffect(() => {
    if (orderId) {
      // In a real app, dispatch an action to fetch order details
      // dispatch(fetchOrderDetails(orderId));
    }
  }, [orderId, dispatch]);

  if (!currentOrder) {
    return (
      <Container maxW="7xl" pt={{ base: '70px', md: '100px' }}>
        <VStack spacing={8} py={20} textAlign="center">
          <Heading>Order Not Found</Heading>
          <Text color="gray.500">
            The order you're looking for doesn't exist or has been removed.
          </Text>
        </VStack>
      </Container>
    );
  }

  const totalAmount = currentOrder.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box minH="100vh" pt="80px">
      <Container maxW="7xl">
        <MotionBox
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <VStack spacing={4} textAlign="center" mb={8}>
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              bgGradient="linear(to-r, brand.400, purple.400, blue.400)"
              bgClip="text"
            >
              Track Your Order
            </Heading>
            <Text color={textColor} fontSize="lg">
              Order ID: {currentOrder.trackingNumber}
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            {/* Left Column - Order Progress */}
            <VStack spacing={8} align="stretch">
              {/* Progress Timeline */}
              <MotionBox
                variants={itemVariant}
                bg={bgColor}
                p={6}
                rounded="xl"
                shadow="md"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <VStack spacing={6} align="stretch">
                  <Progress
                    value={getProgressValue(currentOrder.status)}
                    size="sm"
                    colorScheme="brand"
                    rounded="full"
                    mb={4}
                  />
                  
                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                    {orderSteps.map((step, index) => (
                      <VStack
                        key={index}
                        spacing={2}
                        opacity={
                          getProgressValue(currentOrder.status) >=
                          getProgressValue(step.title.toLowerCase())
                            ? 1
                            : 0.5
                        }
                      >
                        <MotionBox
                          variants={
                            getProgressValue(currentOrder.status) >=
                            getProgressValue(step.title.toLowerCase())
                              ? pulseVariant
                              : {}
                          }
                          animate={
                            getProgressValue(currentOrder.status) >=
                            getProgressValue(step.title.toLowerCase())
                              ? "animate"
                              : "initial"
                          }
                        >
                          <Icon
                            as={step.icon}
                            boxSize={6}
                            color={
                              getProgressValue(currentOrder.status) >=
                              getProgressValue(step.title.toLowerCase())
                                ? "brand.500"
                                : "gray.400"
                            }
                          />
                        </MotionBox>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          textAlign="center"
                        >
                          {step.title}
                        </Text>
                      </VStack>
                    ))}
                  </SimpleGrid>

                  <HStack justify="center" spacing={4}>
                    <Icon as={FaClock} color="brand.500" />
                    <Text fontWeight="medium">
                      Estimated Delivery: {currentOrder.estimatedDeliveryTime}
                    </Text>
                  </HStack>
                </VStack>
              </MotionBox>

              {/* Restaurant Info */}
              <MotionBox
                variants={itemVariant}
                bg={bgColor}
                p={6}
                rounded="xl"
                shadow="md"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <VStack spacing={4} align="stretch">
                  <Heading size="md">Restaurant</Heading>
                  <HStack spacing={4}>
                    <Image
                      src={currentOrder.restaurant.image}
                      alt={currentOrder.restaurant.name}
                      boxSize="80px"
                      objectFit="cover"
                      rounded="lg"
                    />
                    <VStack align="start" spacing={2} flex="1">
                      <HStack>
                        <Text fontWeight="bold">{currentOrder.restaurant.name}</Text>
                        <MotionBadge
                          colorScheme="yellow"
                          display="flex"
                          alignItems="center"
                        >
                          <Icon as={FaStar} mr={1} />
                          {currentOrder.restaurant.rating}
                        </MotionBadge>
                      </HStack>
                      <HStack spacing={4} color="gray.500" fontSize="sm">
                        <HStack>
                          <Icon as={FaMapMarkerAlt} />
                          <Text>{currentOrder.restaurant.address}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={FaPhoneAlt} />
                          <Text>{currentOrder.restaurant.phone}</Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>
                </VStack>
              </MotionBox>

              {/* Driver Info */}
              <MotionBox
                variants={itemVariant}
                bg={bgColor}
                p={6}
                rounded="xl"
                shadow="md"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <VStack spacing={4} align="stretch">
                  <Heading size="md">Delivery Partner</Heading>
                  <HStack spacing={4}>
                    <Image
                      src={currentOrder.driver.image}
                      alt={currentOrder.driver.name}
                      boxSize="80px"
                      objectFit="cover"
                      rounded="lg"
                    />
                    <VStack align="start" spacing={2} flex="1">
                      <HStack>
                        <Text fontWeight="bold">{currentOrder.driver.name}</Text>
                        <MotionBadge
                          colorScheme="yellow"
                          display="flex"
                          alignItems="center"
                        >
                          <Icon as={FaStar} mr={1} />
                          {currentOrder.driver.rating}
                        </MotionBadge>
                      </HStack>
                      <HStack spacing={4} color="gray.500" fontSize="sm">
                        <HStack>
                          <Icon as={FaPhoneAlt} />
                          <Text>{currentOrder.driver.phone}</Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>
                </VStack>
              </MotionBox>
            </VStack>

            {/* Right Column - Order Details */}
            <VStack spacing={8} align="stretch">
              {/* Order Items */}
              <MotionBox
                variants={itemVariant}
                bg={bgColor}
                p={6}
                rounded="xl"
                shadow="md"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <VStack spacing={6} align="stretch">
                  <Heading size="md">Order Details</Heading>
                  <VStack spacing={4} align="stretch">
                    {currentOrder.items.map((item) => (
                      <HStack key={item.id} spacing={4}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          boxSize="60px"
                          objectFit="cover"
                          rounded="lg"
                        />
                        <VStack align="start" flex="1" spacing={0}>
                          <Text fontWeight="medium">{item.name}</Text>
                          <Text fontSize="sm" color="gray.500">
                            Quantity: {item.quantity}
                          </Text>
                        </VStack>
                        <Text fontWeight="medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>

                  <Divider />

                  <VStack spacing={3}>
                    <HStack justify="space-between" w="full">
                      <Text>Subtotal</Text>
                      <Text fontWeight="medium">${totalAmount.toFixed(2)}</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Delivery Fee</Text>
                      <Text fontWeight="medium">$5.00</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Tax</Text>
                      <Text fontWeight="medium">
                        ${(totalAmount * 0.1).toFixed(2)}
                      </Text>
                    </HStack>
                  </VStack>

                  <Divider />

                  <HStack justify="space-between">
                    <Text fontWeight="bold">Total</Text>
                    <Text
                      fontWeight="bold"
                      fontSize="xl"
                      bgGradient="linear(to-r, brand.500, purple.500)"
                      bgClip="text"
                    >
                      ${(totalAmount + 5 + totalAmount * 0.1).toFixed(2)}
                    </Text>
                  </HStack>
                </VStack>
              </MotionBox>

              {/* Delivery Address */}
              <MotionBox
                variants={itemVariant}
                bg={bgColor}
                p={6}
                rounded="xl"
                shadow="md"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <VStack spacing={4} align="stretch">
                  <Heading size="md">Delivery Address</Heading>
                  <HStack spacing={4} color="gray.500">
                    <Icon as={FaMapMarkerAlt} />
                    <Text>{currentOrder.deliveryAddress}</Text>
                  </HStack>
                </VStack>
              </MotionBox>

              {/* Actions */}
              <Button
                colorScheme="brand"
                size="lg"
                onClick={() => navigate('/menu')}
                bgGradient="linear(to-r, brand.500, purple.500)"
                _hover={{
                  bgGradient: "linear(to-r, brand.600, purple.600)",
                }}
              >
                Order More
              </Button>
            </VStack>
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
} 