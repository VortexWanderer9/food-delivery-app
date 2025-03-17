import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Input,
  Select,
  HStack,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Spinner,
  useColorModeValue,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  Badge,
  Icon,
  IconButton,
  Tooltip,
  Image,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaFire,
  FaLeaf,
  FaCrown,
  FaShoppingCart,
  FaHeart,
  FaTimes,
  FaClock,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/store';
import {
  fetchMenuStart,
  fetchMenuSuccess,
  filterByCategory,
  searchItems,
  sortByPrice,
  sortByRating,
} from '../features/menuSlice';
import FoodCard from '../components/FoodCard';
import { motion, AnimatePresence } from 'framer-motion';
import { addItem } from '../features/cartSlice';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  restaurant: string;
  rating: number;
  preparationTime: number;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isBestSeller?: boolean;
  isPopular?: boolean;
}

interface FoodCardProps {
  item: MenuItem;
  onAddToCart: () => void;
}

// Motion Components
const MotionBox = motion.create(Box);
const MotionSimpleGrid = motion.create(SimpleGrid);
const MotionVStack = motion.create(VStack);
const MotionHStack = motion.create(HStack);
const MotionImage = motion.create(Image);
const MotionBadge = motion.create(Badge);
const MotionIconButton = motion.create(IconButton);

// Mock data for demonstration
const mockMenuItems = [
  // Italian Cuisine
  {
    id: '1',
    name: 'Classic Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143',
    category: 'Pizza',
    rating: 4.5,
    preparationTime: 20,
    restaurant: "Mario's Pizza",
    isVegetarian: true,
    isBestSeller: true,
    isPopular: true,
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Classic pizza with spicy pepperoni and melted cheese',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
    category: 'Pizza',
    rating: 4.8,
    preparationTime: 20,
    restaurant: "Mario's Pizza",
    isBestSeller: true,
    isPopular: true,
  },
  {
    id: '3',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with pancetta, eggs, and parmesan',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
    category: 'Italian',
    rating: 4.7,
    preparationTime: 15,
    restaurant: "Bella Italia",
    isPopular: true,
  },

  // Burgers & Sandwiches
  {
    id: '4',
    name: 'Classic Cheeseburger',
    description: 'Beef patty with cheddar, lettuce, tomato, and special sauce',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    category: 'Burgers',
    rating: 4.6,
    preparationTime: 15,
    restaurant: "Burger Haven",
    isBestSeller: true,
    isPopular: true,
  },
  {
    id: '5',
    name: 'Double Bacon Burger',
    description: 'Double beef patties with crispy bacon and cheese',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b',
    category: 'Burgers',
    rating: 4.8,
    preparationTime: 18,
    restaurant: "Burger Haven",
    isBestSeller: true,
    isPopular: true,
  },
  {
    id: '6',
    name: 'Grilled Chicken Sandwich',
    description: 'Grilled chicken breast with avocado and chipotle mayo',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0',
    category: 'Burgers',
    rating: 4.4,
    preparationTime: 12,
    restaurant: "Sandwich Co.",
    isPopular: true,
  },

  // Asian Cuisine
  {
    id: '7',
    name: 'California Roll',
    description: 'Crab, avocado, and cucumber roll with sesame seeds',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    category: 'Sushi',
    rating: 4.7,
    preparationTime: 25,
    restaurant: "Sushi Master",
    isPopular: true,
  },
  {
    id: '8',
    name: 'Spicy Ramen',
    description: 'Japanese noodle soup with spicy broth and tender pork',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1',
    category: 'Asian',
    rating: 4.9,
    preparationTime: 15,
    restaurant: "Ramen House",
    isSpicy: true,
    isBestSeller: true,
    isPopular: true,
  },
  {
    id: '9',
    name: 'Pad Thai',
    description: 'Stir-fried rice noodles with shrimp, tofu, and peanuts',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e',
    category: 'Asian',
    rating: 4.6,
    preparationTime: 20,
    restaurant: "Thai Spice",
    isSpicy: true,
    isPopular: true,
  },

  // Mexican Cuisine
  {
    id: '10',
    name: 'Street Tacos',
    description: 'Three authentic tacos with choice of meat and fresh salsa',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    category: 'Mexican',
    rating: 4.7,
    preparationTime: 15,
    restaurant: "Taco Fiesta",
    isSpicy: true,
    isPopular: true,
  },
  {
    id: '11',
    name: 'Chicken Quesadilla',
    description: 'Grilled flour tortilla filled with chicken and cheese',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f',
    category: 'Mexican',
    rating: 4.5,
    preparationTime: 18,
    restaurant: "Taco Fiesta",
    isPopular: true,
  },
  {
    id: '12',
    name: 'Supreme Nachos',
    description: 'Tortilla chips loaded with toppings and guacamole',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d',
    category: 'Mexican',
    rating: 4.8,
    preparationTime: 15,
    restaurant: "Taco Fiesta",
    isBestSeller: true,
    isPopular: true,
  },

  // Healthy Options
  {
    id: '13',
    name: 'Mediterranean Salad',
    description: 'Fresh mixed greens with feta, olives, and balsamic dressing',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
    category: 'Salads',
    rating: 4.4,
    preparationTime: 10,
    restaurant: "Green Bowl",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: '14',
    name: 'Buddha Bowl',
    description: 'Quinoa, roasted vegetables, avocado, and tahini dressing',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    category: 'Salads',
    rating: 4.7,
    preparationTime: 12,
    restaurant: "Green Bowl",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: '15',
    name: 'Poke Bowl',
    description: 'Fresh tuna, rice, avocado, and Asian-inspired dressing',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    category: 'Salads',
    rating: 4.8,
    preparationTime: 15,
    restaurant: "Poke Bar",
    isBestSeller: true,
    isPopular: true,
  },

  // Desserts
  {
    id: '16',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51',
    category: 'Desserts',
    rating: 4.7,
    preparationTime: 15,
    restaurant: "Sweet Treats",
    isVegetarian: true,
    isBestSeller: true,
    isPopular: true,
  },
  {
    id: '17',
    name: 'New York Cheesecake',
    description: 'Classic creamy cheesecake with berry compote',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50',
    category: 'Desserts',
    rating: 4.6,
    preparationTime: 10,
    restaurant: "Sweet Treats",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: '18',
    name: 'Tiramisu',
    description: 'Italian coffee-flavored dessert with mascarpone',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
    category: 'Desserts',
    rating: 4.8,
    preparationTime: 10,
    restaurant: "Bella Italia",
    isVegetarian: true,
    isPopular: true,
  },

  // Indian Cuisine
  {
    id: '19',
    name: 'Butter Chicken',
    description: 'Tender chicken in rich tomato-butter sauce with naan',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
    category: 'Indian',
    rating: 4.8,
    preparationTime: 25,
    restaurant: "Spice Route",
    isBestSeller: true,
    isPopular: true,
  },
  {
    id: '20',
    name: 'Vegetable Biryani',
    description: 'Aromatic rice with mixed vegetables and spices',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
    category: 'Indian',
    rating: 4.6,
    preparationTime: 30,
    restaurant: "Spice Route",
    isVegetarian: true,
    isSpicy: true,
    isPopular: true,
  },

  // Beverages
  {
    id: '21',
    name: 'Fresh Fruit Smoothie',
    description: 'Blend of seasonal fruits with yogurt and honey',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625',
    category: 'Beverages',
    rating: 4.5,
    preparationTime: 5,
    restaurant: "Juice Bar",
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: '22',
    name: 'Iced Caramel Latte',
    description: 'Espresso with caramel syrup and cold milk',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
    category: 'Beverages',
    rating: 4.6,
    preparationTime: 5,
    restaurant: "Coffee House",
    isVegetarian: true,
    isPopular: true,
  },
];

const categories = ['All', 'Popular', 'Pizza', 'Burgers', 'Asian', 'Mexican', 'Indian', 'Salads', 'Desserts', 'Beverages'];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const badgeVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export default function Menu() {
  // Redux hooks
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  // Chakra UI hooks
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // State hooks
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Effect hooks
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Memoized values
  const filteredItems = useMemo(() => {
    return mockMenuItems.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'time':
          return a.preparationTime - b.preparationTime;
        default:
          return 0;
      }
    });
  }, [filteredItems, sortBy]);

  // Event handlers
  const handleAddToCart = useCallback((item: MenuItem) => {
    dispatch(addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    }));
    toast({
      title: 'Added to Cart',
      description: `${item.name} has been added to your cart`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  }, [dispatch, toast]);

  const toggleFavorite = useCallback((itemId: string) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  // Render functions
  const renderSkeleton = useCallback(() => (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
      {[...Array(8)].map((_, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="xl" overflow="hidden">
          <Skeleton height="200px" />
          <VStack mt={4} align="start" spacing={2}>
            <Skeleton height="20px" width="80%" />
            <Skeleton height="16px" width="60%" />
            <Skeleton height="24px" width="40%" />
          </VStack>
        </Box>
      ))}
    </SimpleGrid>
  ), []);

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Text
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
            textAlign="center"
            bgGradient="linear(to-r, brand.400, purple.400)"
            bgClip="text"
            mb={4}
          >
            Our Menu
          </Text>
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color="gray.600"
            textAlign="center"
            maxW="2xl"
            mx="auto"
          >
            Discover our delicious selection of dishes, carefully crafted to satisfy your cravings
          </Text>
        </MotionBox>

        {/* Search and Filter Section */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                _focus={{ borderColor: 'brand.500' }}
              />
            </InputGroup>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              _focus={{ borderColor: 'brand.500' }}
            >
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="time">Quickest to Prepare</option>
            </Select>
            {isMobile ? (
              <Button
                leftIcon={<Icon as={FaFilter} />}
                onClick={onOpen}
                colorScheme="brand"
              >
                Filter
              </Button>
            ) : (
              <HStack spacing={2} overflowX="auto" pb={2}>
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? 'solid' : 'outline'}
                    colorScheme={selectedCategory === category ? 'brand' : 'gray'}
                    onClick={() => setSelectedCategory(category)}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'md',
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </HStack>
            )}
          </SimpleGrid>
        </MotionBox>

        {/* Mobile Filter Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Filter Categories</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'solid' : 'outline'}
                    colorScheme={selectedCategory === category ? 'brand' : 'gray'}
                    onClick={() => {
                      setSelectedCategory(category);
                      onClose();
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            renderSkeleton()
          ) : (
            <MotionSimpleGrid
              columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
              spacing={6}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedItems.map((item) => (
                <MotionBox
                  key={item.id}
                  variants={itemVariants}
                  p={4}
                  bg={useColorModeValue('white', 'gray.800')}
                  borderWidth="1px"
                  borderRadius="xl"
                  overflow="hidden"
                  position="relative"
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: 'xl',
                  }}
                  transition="all 0.3s"
                >
                  {/* Image Container */}
                  <Box position="relative" overflow="hidden" borderRadius="lg" mb={4}>
                    <MotionImage
                      src={item.image}
                      alt={item.name}
                      width="100%"
                      height="200px"
                      objectFit="cover"
                      variants={imageVariants}
                      whileHover="hover"
                    />
                    <Box
                      position="absolute"
                      top={2}
                      right={2}
                      zIndex={1}
                    >
                      <MotionIconButton
                        aria-label="Add to favorites"
                        icon={favorites.includes(item.id) ? <FaHeart /> : <FaHeart />}
                        colorScheme={favorites.includes(item.id) ? 'red' : 'gray'}
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(item.id)}
                        variants={badgeVariants}
                        whileHover="hover"
                      />
                    </Box>
                  </Box>

                  {/* Content */}
                  <VStack align="start" spacing={2}>
                    <HStack justify="space-between" width="100%">
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        noOfLines={1}
                      >
                        {item.name}
                      </Text>
                      <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="brand.500"
                      >
                        ${item.price.toFixed(2)}
                      </Text>
                    </HStack>
                    <Text
                      color="gray.600"
                      fontSize="sm"
                      noOfLines={2}
                    >
                      {item.description}
                    </Text>
                    <HStack spacing={2} width="100%">
                      <Badge colorScheme="green" variant="subtle">
                        <HStack spacing={1}>
                          <Icon as={FaStar} />
                          <Text>{item.rating}</Text>
                        </HStack>
                      </Badge>
                      <Badge colorScheme="blue" variant="subtle">
                        <HStack spacing={1}>
                          <Icon as={FaClock} />
                          <Text>{item.preparationTime} min</Text>
                        </HStack>
                      </Badge>
                      {item.isSpicy && (
                        <Badge colorScheme="red" variant="subtle">
                          <HStack spacing={1}>
                            <Icon as={FaFire} />
                            <Text>Spicy</Text>
                          </HStack>
                        </Badge>
                      )}
                      {item.isVegetarian && (
                        <Badge colorScheme="green" variant="subtle">
                          <HStack spacing={1}>
                            <Icon as={FaLeaf} />
                            <Text>Veg</Text>
                          </HStack>
                        </Badge>
                      )}
                    </HStack>
                    <Button
                      colorScheme="brand"
                      width="100%"
                      onClick={() => handleAddToCart(item)}
                      leftIcon={<Icon as={FaShoppingCart} />}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                    >
                      Add to Cart
                    </Button>
                  </VStack>
                </MotionBox>
              ))}
            </MotionSimpleGrid>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && sortedItems.length === 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            textAlign="center"
            py={10}
          >
            <Icon as={FaShoppingCart} boxSize={16} color="gray.400" mb={4} />
            <Text fontSize="xl" color="gray.600">
              No items found matching your criteria
            </Text>
          </MotionBox>
        )}
      </VStack>
    </Container>
  );
} 