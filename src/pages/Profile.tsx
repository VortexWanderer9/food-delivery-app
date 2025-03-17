import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Avatar,
  Divider,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Icon,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Skeleton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { FaUser, FaHistory, FaHeart, FaMapMarkerAlt, FaBell, FaCreditCard, FaShieldAlt, FaShoppingCart, FaStar, FaCheckCircle, FaArrowRight, FaList } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/store';
import { updateProfile } from '../features/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

const staggerChildren = {
  animate: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const springTransition = {
  type: "spring",
  stiffness: 200,
  damping: 15
};

const pulseAnimation = {
  scale: [1, 1.02, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const hoverEffect = {
  scale: 1.03,
  y: -5,
  transition: {
    duration: 0.2,
    ease: "easeOut"
  }
};

const foodCategories = [
  { name: 'All Time Favorites', color: 'red.400', icon: FaStar },
  { name: 'Recently Ordered', color: 'green.400', icon: FaHistory },
  { name: 'Recommended', color: 'purple.400', icon: FaHeart }
];

const favoriteItemsList = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    category: 'All Time Favorites',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Chicken Burger',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: 'Recently Ordered',
    rating: 4.5
  },
  {
    id: 3,
    name: 'Sushi Roll',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: 'Recommended',
    rating: 4.9
  },
  {
    id: 4,
    name: 'Pasta Carbonara',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df',
    category: 'All Time Favorites',
    rating: 4.7
  },
  {
    id: 5,
    name: 'Thai Green Curry',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
    category: 'Recommended',
    rating: 4.6
  },
  {
    id: 6,
    name: 'Classic Tacos',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    category: 'Recently Ordered',
    rating: 4.4
  }
];

export default function Profile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const orders = useSelector((state: RootState) => state.order.orders);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [favoriteItems] = useState([
    { id: 1, name: 'Margherita Pizza', price: 12.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' },
    { id: 2, name: 'Chicken Burger', price: 9.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' },
  ]);

  const [notifications] = useState([
    { id: 1, message: 'Your order #123 has been delivered', date: new Date(), isRead: false },
    { id: 2, message: 'Special offer: 20% off on your next order', date: new Date(Date.now() - 86400000), isRead: true },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All Time Favorites');
  const [filteredFavorites, setFilteredFavorites] = useState(favoriteItemsList);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredFavorites(favoriteItemsList);
    } else {
      setFilteredFavorites(favoriteItemsList.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please check the form for errors',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(updateProfile(formData));
      setIsEditing(false);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update profile. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    onClose();
    toast({
      title: 'Account Deleted',
      description: 'Your account has been successfully deleted.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    navigate('/');
  };

  if (!user) {
    return (
      <Container maxW="7xl" pt={{ base: '70px', md: '100px' }}>
        <VStack spacing={8} py={20} textAlign="center">
          <Heading>Please Login</Heading>
          <Text color="gray.500">You need to be logged in to view your profile</Text>
          <Button colorScheme="brand" size="lg" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" pt={{ base: '70px', md: '100px' }}>
      <AnimatePresence mode="wait">
        <MotionBox
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <MotionCard
            variants={fadeInUp}
            transition={springTransition}
            whileHover={hoverEffect}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="xl"
            overflow="hidden"
            boxShadow="xl"
          >
            <CardHeader>
              <VStack spacing={6} align="center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={springTransition}
                >
                  <Avatar
                    size="2xl"
                    name={user?.name}
                    src={user?.avatar}
                    bg="brand.500"
                    border="4px solid"
                    borderColor={useColorModeValue('brand.500', 'brand.400')}
                    shadow="xl"
                  />
                </motion.div>
                {!isEditing && (
                  <VStack spacing={2}>
                    <Heading size="lg" bgGradient="linear(to-r, brand.500, purple.500)" bgClip="text">
                      {user.name}
                    </Heading>
                    <Text color="gray.500" fontSize="lg">{user.email}</Text>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, ...springTransition }}
                    >
                      <Badge
                        colorScheme="green"
                        fontSize="0.9em"
                        px={3}
                        py={1}
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >
                        <Icon as={FaCheckCircle} />
                        Verified Account
                      </Badge>
                    </motion.div>
                  </VStack>
                )}
              </VStack>
            </CardHeader>
            <CardBody>
              <Tabs isFitted variant="soft-rounded" colorScheme="brand">
                <TabList mb="1em" p={2} bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="full">
                  {['Profile', 'Orders', 'Favorites', 'Notifications'].map((tab, index) => (
                    <Tab
                      key={tab}
                      _selected={{
                        color: 'white',
                        bg: 'brand.500',
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                      _hover={{
                        bg: useColorModeValue('gray.200', 'gray.600'),
                      }}
                      borderRadius="full"
                      transition="all 0.3s"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HStack spacing={2}>
                          <Icon
                            as={
                              index === 0 ? FaUser :
                              index === 1 ? FaHistory :
                              index === 2 ? FaHeart :
                              FaBell
                            }
                          />
                          <Text>{tab}</Text>
                        </HStack>
                      </motion.div>
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {isEditing ? (
                      <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                          <FormControl isInvalid={!!formErrors.name}>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                            <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                          </FormControl>
                          <FormControl isInvalid={!!formErrors.email}>
                            <FormLabel>Email</FormLabel>
                            <Input
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              type="email"
                            />
                            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                          </FormControl>
                          <FormControl isInvalid={!!formErrors.phone}>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            <FormErrorMessage>{formErrors.phone}</FormErrorMessage>
                          </FormControl>
                          <FormControl isInvalid={!!formErrors.address}>
                            <FormLabel>Delivery Address</FormLabel>
                            <Input
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                            <FormErrorMessage>{formErrors.address}</FormErrorMessage>
                          </FormControl>
                          <HStack spacing={4} width="100%">
                            <Button
                              type="submit"
                              colorScheme="brand"
                              flex={1}
                              isLoading={isLoading}
                            >
                              Save Changes
                            </Button>
                            <Button
                              onClick={() => setIsEditing(false)}
                              variant="outline"
                              isDisabled={isLoading}
                            >
                              Cancel
                            </Button>
                          </HStack>
                        </VStack>
                      </form>
                    ) : (
                      <VStack spacing={6} align="stretch">
                        <HStack justify="space-between">
                          <Button
                            onClick={() => setIsEditing(true)}
                            colorScheme="brand"
                            variant="outline"
                            leftIcon={<FaUser />}
                          >
                            Edit Profile
                          </Button>
                          <Button
                            colorScheme="red"
                            variant="ghost"
                            onClick={onOpen}
                          >
                            Delete Account
                          </Button>
                        </HStack>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                          <Box
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            borderRadius="lg"
                            bg={useColorModeValue('white', 'gray.700')}
                          >
                            <VStack align="start" spacing={3}>
                              <HStack>
                                <Icon as={FaUser} color="brand.500" />
                                <Text fontWeight="bold">Contact Information</Text>
                              </HStack>
                              <Text>Phone: {user.phone || 'Not provided'}</Text>
                              <Text>Email: {user.email}</Text>
                            </VStack>
                          </Box>
                          <Box
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            borderRadius="lg"
                            bg={useColorModeValue('white', 'gray.700')}
                          >
                            <VStack align="start" spacing={3}>
                              <HStack>
                                <Icon as={FaMapMarkerAlt} color="brand.500" />
                                <Text fontWeight="bold">Delivery Address</Text>
                              </HStack>
                              <Text>{user.address || 'No address provided'}</Text>
                            </VStack>
                          </Box>
                        </SimpleGrid>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                          <Box
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            borderRadius="lg"
                            bg={useColorModeValue('white', 'gray.700')}
                          >
                            <VStack align="start" spacing={3}>
                              <HStack>
                                <Icon as={FaCreditCard} color="brand.500" />
                                <Text fontWeight="bold">Payment Methods</Text>
                              </HStack>
                              <Button size="sm" colorScheme="brand" variant="outline">
                                Add Payment Method
                              </Button>
                            </VStack>
                          </Box>
                          <Box
                            p={5}
                            shadow="md"
                            borderWidth="1px"
                            borderRadius="lg"
                            bg={useColorModeValue('white', 'gray.700')}
                          >
                            <VStack align="start" spacing={3}>
                              <HStack>
                                <Icon as={FaShieldAlt} color="brand.500" />
                                <Text fontWeight="bold">Security</Text>
                              </HStack>
                              <Button size="sm" colorScheme="brand" variant="outline">
                                Change Password
                              </Button>
                            </VStack>
                          </Box>
                        </SimpleGrid>
                      </VStack>
                    )}
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      <AnimatePresence>
                        {orders.length > 0 ? (
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            {orders.map((order, index) => (
                              <MotionBox
                                key={order.id}
                                variants={fadeInUp}
                                custom={index}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                whileHover={hoverEffect}
                              >
                                <Box
                                  p={6}
                                  shadow="xl"
                                  borderWidth="1px"
                                  borderRadius="xl"
                                  bg={useColorModeValue('white', 'gray.700')}
                                  position="relative"
                                  overflow="hidden"
                                >
                                  <VStack align="start" spacing={4}>
                                    <HStack justify="space-between" width="100%">
                                      <Heading size="md">Order #{order.trackingNumber}</Heading>
                                      <Badge
                                        colorScheme={
                                          order.status === 'delivered' ? 'green' :
                                          order.status === 'preparing' ? 'orange' :
                                          'blue'
                                        }
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        fontSize="sm"
                                      >
                                        {order.status}
                                      </Badge>
                                    </HStack>
                                    <Text color="gray.500">
                                      {new Date(order.createdAt).toLocaleDateString()}
                                    </Text>
                                    <Text
                                      color="brand.500"
                                      fontWeight="bold"
                                      fontSize="xl"
                                    >
                                      ${order.total.toFixed(2)}
                                    </Text>
                                    <MotionButton
                                      size="sm"
                                      variant="outline"
                                      colorScheme="brand"
                                      rightIcon={<Icon as={FaArrowRight} />}
                                      onClick={() => navigate(`/track-order/${order.id}`)}
                                      whileHover={{ x: 5 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      Track Order
                                    </MotionButton>
                                  </VStack>
                                </Box>
                              </MotionBox>
                            ))}
                          </SimpleGrid>
                        ) : (
                          <MotionBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            textAlign="center"
                            py={10}
                          >
                            <Icon as={FaShoppingCart} fontSize="6xl" color="gray.300" mb={4} />
                            <Text color="gray.500" fontSize="lg" mb={4}>No orders yet</Text>
                            <MotionButton
                              colorScheme="brand"
                              size="lg"
                              onClick={() => navigate('/menu')}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              rightIcon={<Icon as={FaArrowRight} />}
                            >
                              Browse Menu
                            </MotionButton>
                          </MotionBox>
                        )}
                      </AnimatePresence>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={6} align="stretch">
                      <HStack spacing={4} overflowX="auto" py={2} css={{ scrollbarWidth: 'none' }}>
                        {['All', ...foodCategories.map(c => c.name)].map((category) => (
                          <MotionButton
                            key={category}
                            size="md"
                            variant={selectedCategory === category ? "solid" : "outline"}
                            colorScheme="brand"
                            onClick={() => setSelectedCategory(category)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            leftIcon={
                              <Icon
                                as={
                                  category === 'All' ? FaList :
                                  foodCategories.find(c => c.name === category)?.icon
                                }
                              />
                            }
                            px={6}
                            borderRadius="full"
                          >
                            {category}
                          </MotionButton>
                        ))}
                      </HStack>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        <AnimatePresence mode="wait">
                          {filteredFavorites.map((item, index) => (
                            <MotionBox
                              key={item.id}
                              variants={fadeInUp}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ delay: index * 0.1 }}
                              whileHover={hoverEffect}
                            >
                              <Box
                                p={4}
                                shadow="xl"
                                borderWidth="1px"
                                borderRadius="xl"
                                bg={useColorModeValue('white', 'gray.700')}
                                position="relative"
                                overflow="hidden"
                              >
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.2 }}
                                >
                                  <Box
                                    position="absolute"
                                    top={2}
                                    right={2}
                                    zIndex={1}
                                  >
                                    <Badge
                                      colorScheme={
                                        item.rating >= 4.8 ? "green" :
                                        item.rating >= 4.5 ? "blue" :
                                        "orange"
                                      }
                                      variant="solid"
                                      px={3}
                                      py={1}
                                      borderRadius="full"
                                      fontSize="sm"
                                    >
                                      <HStack spacing={1}>
                                        <Icon as={FaStar} />
                                        <Text>{item.rating}</Text>
                                      </HStack>
                                    </Badge>
                                  </Box>
                                  <Box
                                    height="200px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    mb={4}
                                  >
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <Box
                                        backgroundImage={`url(${item.image})`}
                                        backgroundSize="cover"
                                        backgroundPosition="center"
                                        height="100%"
                                        width="100%"
                                      />
                                    </motion.div>
                                  </Box>
                                  <VStack align="start" spacing={3}>
                                    <Heading size="md">{item.name}</Heading>
                                    <Text
                                      color="brand.500"
                                      fontWeight="bold"
                                      fontSize="xl"
                                    >
                                      ${item.price}
                                    </Text>
                                    <Badge
                                      colorScheme={
                                        item.category === 'All Time Favorites' ? 'red' :
                                        item.category === 'Recently Ordered' ? 'green' :
                                        'purple'
                                      }
                                      px={3}
                                      py={1}
                                      borderRadius="full"
                                    >
                                      {item.category}
                                    </Badge>
                                    <MotionButton
                                      width="full"
                                      colorScheme="brand"
                                      leftIcon={<Icon as={FaShoppingCart} />}
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      Order Again
                                    </MotionButton>
                                  </VStack>
                                </motion.div>
                              </Box>
                            </MotionBox>
                          ))}
                        </AnimatePresence>
                      </SimpleGrid>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <AnimatePresence>
                        {notifications.map((notification, index) => (
                          <MotionBox
                            key={notification.id}
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ delay: index * 0.1 }}
                            whileHover={hoverEffect}
                          >
                            <Box
                              p={4}
                              shadow="md"
                              borderWidth="1px"
                              borderRadius="xl"
                              bg={useColorModeValue(
                                notification.isRead ? 'white' : 'gray.50',
                                notification.isRead ? 'gray.700' : 'gray.600'
                              )}
                              position="relative"
                              overflow="hidden"
                            >
                              <HStack justify="space-between" align="start">
                                <VStack align="start" spacing={2}>
                                  <Text fontSize="lg">{notification.message}</Text>
                                  <Text fontSize="sm" color="gray.500">
                                    {notification.date.toLocaleDateString()}
                                  </Text>
                                </VStack>
                                {!notification.isRead && (
                                  <motion.div animate={pulseAnimation}>
                                    <Badge
                                      colorScheme="red"
                                      variant="solid"
                                      borderRadius="full"
                                      px={3}
                                      py={1}
                                    >
                                      New
                                    </Badge>
                                  </motion.div>
                                )}
                              </HStack>
                            </Box>
                          </MotionBox>
                        ))}
                      </AnimatePresence>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </MotionCard>
        </MotionBox>
      </AnimatePresence>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone. All your data, including order history and saved preferences, will be permanently deleted.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteAccount} ml={3}>
                Delete Account
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
} 