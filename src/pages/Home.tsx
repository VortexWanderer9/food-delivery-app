import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
  SimpleGrid,
  VStack,
  Badge,
  HStack,
  Divider,
  chakra,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaMotorcycle, FaUtensils, FaClock, FaStar, FaLeaf, FaAward, FaShieldAlt, FaHeart, FaPhoneAlt, FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaHeadset } from 'react-icons/fa';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// Motion Components with proper types
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionBadge = motion(Badge);
const MotionHeading = motion(Heading);
const MotionButton = motion(Button);
const MotionImage = motion(Image);
const MotionIconButton = motion(IconButton);
const MotionContainer = motion(Container);
const MotionStack = motion(Stack);
const MotionVStack = motion(VStack);

// Optimized base transition settings
const smoothTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1
};

// Smooth fade in up animation
const smoothFadeInUp = {
  initial: { 
    opacity: 0, 
    y: 30,
    filter: "blur(8px)"
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      ...smoothTransition,
      stiffness: 70,
      damping: 20
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    filter: "blur(8px)",
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

// Smooth floating animation
const smoothFloating = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Enhanced stagger container
const smoothStagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
};

// Smooth scale animation for interactive elements
const smoothScale = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.03,
    transition: {
      ...smoothTransition,
      stiffness: 300,
      damping: 15
    }
  },
  tap: { 
    scale: 0.97,
    transition: {
      ...smoothTransition,
      stiffness: 500,
      damping: 15
    }
  }
};

// Smooth image reveal
const smoothReveal = {
  initial: { 
    opacity: 0, 
    scale: 0.95,
    filter: "blur(10px)"
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      ...smoothTransition,
      duration: 0.8
    }
  }
};

const features = [
  {
    title: 'Lightning Fast Delivery',
    text: 'Get your food delivered in under 30 minutes',
    icon: FaMotorcycle,
    color: 'cyan.400',
    gradient: 'linear(to-r, cyan.400, blue.500)',
  },
  {
    title: 'Premium Quality',
    text: 'Prepared by top-rated restaurants',
    icon: FaUtensils,
    color: 'teal.400',
    gradient: 'linear(to-r, teal.400, green.500)',
  },
  {
    title: 'Live Tracking',
    text: 'Track your order in real-time',
    icon: FaClock,
    color: 'purple.400',
    gradient: 'linear(to-r, purple.400, pink.500)',
  },
  {
    title: 'Fresh & Healthy',
    text: 'Only the freshest ingredients',
    icon: FaLeaf,
    color: 'green.400',
    gradient: 'linear(to-r, green.400, teal.500)',
  },
  {
    title: 'Award Winning',
    text: 'Multiple culinary awards',
    icon: FaAward,
    color: 'yellow.400',
    gradient: 'linear(to-r, yellow.400, orange.500)',
  },
  {
    title: 'Secure Ordering',
    text: 'Safe and secure payments',
    icon: FaShieldAlt,
    color: 'blue.400',
    gradient: 'linear(to-r, blue.400, indigo.500)',
  },
];

const popularDishes = [
  {
    name: 'Supreme Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    price: '$18.99',
    rating: 4.8,
    category: 'Italian',
  },
  {
    name: 'Chicken Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    price: '$12.99',
    rating: 4.6,
    category: 'American',
  },
  {
    name: 'Sushi Platter',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    price: '$24.99',
    rating: 4.9,
    category: 'Japanese',
  },
];

const stats = [
  { number: '15k+', label: 'Happy Customers' },
  { number: '150+', label: 'Restaurant Partners' },
  { number: '30min', label: 'Average Delivery' },
  { number: '4.8', label: 'Customer Rating' },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Food Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "The best food delivery service I have ever used. Quick, reliable, and always delicious!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    text: "Amazing variety of restaurants and consistently great service. Highly recommended!",
    rating: 5
  },
  {
    name: "Emily Davis",
    role: "Food Blogger",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    text: "As a food blogger, I appreciate the quality and presentation. Never disappoints!",
    rating: 5
  }
];

const gradientTextStyles = {
  bgGradient: "linear(to-r, brand.400, purple.400)",
  bgClip: "text",
  textFillColor: "transparent"
};

export default function Home() {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const cardBg = useColorModeValue('white', 'gray.700');
  const sectionBg = useColorModeValue('gray.50', 'gray.900');
  const glassBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.500');
  const primaryColor = useColorModeValue('brand.500', 'brand.300');

  return (
    <Box>
      <AnimatePresence mode="wait">
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Box
            position="relative"
            overflow="hidden"
            bg={useColorModeValue('gray.50', 'gray.900')}
            minH={{ base: "90vh", md: "85vh" }}
            display="flex"
            alignItems="center"
            pt={{ base: '6rem', md: '8rem' }}
            pb={{ base: '4rem', md: '6rem' }}
          >
            {/* Background Pattern with smooth animation */}
            <MotionBox
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="url('data:image/svg+xml,%3Csvg...')"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.4, rotate: 45 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <Container maxW="8xl" position="relative">
              <MotionStack
                direction={{ base: 'column', lg: 'row' }}
                spacing={{ base: 10, md: 20 }}
                align="center"
                justify="space-between"
                w="full"
                variants={smoothStagger}
                initial="initial"
                animate="animate"
              >
                {/* Left Column - Content */}
                <MotionVStack
                  flex={1}
                  spacing={{ base: 6, md: 8 }}
                  align={{ base: 'center', lg: 'start' }}
                  textAlign={{ base: 'center', lg: 'left' }}
                  variants={smoothFadeInUp}
                >
                  <MotionBox
                    variants={smoothFloating}
                    initial="initial"
                    animate="animate"
                  >
                    <Badge
                      colorScheme="brand"
                      fontSize={{ base: "md", md: "lg" }}
                      px={4}
                      py={2}
                      rounded="full"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      bg={useColorModeValue('brand.50', 'brand.900')}
                      color={useColorModeValue('brand.600', 'brand.200')}
                    >
                      #1 Food Delivery App
                    </Badge>
                  </MotionBox>

                  <MotionHeading
                    fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                    fontWeight="bold"
                    lineHeight="shorter"
                    bgGradient="linear(to-r, brand.400, purple.400, blue.400)"
                    bgClip="text"
                    variants={smoothFadeInUp}
                  >
                    Delicious Food,
                    <br />
                    Delivered to Your Door
                  </MotionHeading>

                  <MotionText
                    fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                    color={useColorModeValue('gray.600', 'gray.300')}
                    maxW="600px"
                    variants={smoothFadeInUp}
                  >
                    Discover a world of flavors with our curated selection of restaurants. 
                    From local favorites to international cuisine, we bring the best food right to you.
                  </MotionText>

                  <MotionStack
                    direction={{ base: 'column', sm: 'row' }}
                    spacing={4}
                    w={{ base: 'full', sm: 'auto' }}
                  >
                    <MotionButton
                      as={RouterLink}
                      to="/menu"
                      size="lg"
                      fontSize="xl"
                      h="16"
                      px="8"
                      colorScheme="brand"
                      rightIcon={<Icon as={FaArrowRight} />}
                      bgGradient="linear(to-r, brand.400, purple.500)"
                      variants={smoothScale}
                      whileHover="hover"
                      whileTap="tap"
                      _hover={{
                        bgGradient: "linear(to-r, brand.500, purple.600)",
                        shadow: "xl"
                      }}
                    >
                      Explore Menu
                    </MotionButton>
                    <MotionButton
                      size="lg"
                      fontSize="xl"
                      h="16"
                      px="8"
                      variant="outline"
                      colorScheme="brand"
                      leftIcon={<Icon as={FaHeart} />}
                      variants={smoothScale}
                      whileHover="hover"
                      whileTap="tap"
                      _hover={{
                        bg: useColorModeValue('brand.50', 'brand.900'),
                        shadow: "xl"
                      }}
                    >
                      View Favorites
                    </MotionButton>
                  </MotionStack>

                  {/* Stats Section with smooth stagger */}
                  <SimpleGrid
                    columns={{ base: 2, md: 4 }}
                    spacing={{ base: 4, md: 8 }}
                    mt={{ base: 8, md: 12 }}
                    w="full"
                  >
                    {stats.map((stat, index) => (
                      <MotionBox
                        key={stat.label}
                        variants={smoothFadeInUp}
                        custom={index}
                      >
                        <MotionBox
                          p={4}
                          bg={useColorModeValue('white', 'gray.800')}
                          rounded="xl"
                          shadow="lg"
                          variants={smoothScale}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <VStack>
                            <MotionText
                              fontSize={{ base: '2xl', md: '3xl' }}
                              fontWeight="bold"
                              bgGradient="linear(to-r, brand.400, purple.400)"
                              bgClip="text"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: index * 0.1,
                                ...smoothTransition
                              }}
                            >
                              {stat.number}
                            </MotionText>
                            <Text fontSize="sm" color={textColor}>
                              {stat.label}
                            </Text>
                          </VStack>
                        </MotionBox>
                      </MotionBox>
                    ))}
                  </SimpleGrid>
                </MotionVStack>

                {/* Right Column - Enhanced Image Grid with smooth animations */}
                <MotionBox
                  flex={1}
                  display={{ base: 'none', lg: 'block' }}
                  variants={smoothStagger}
                >
                  <Grid
                    templateColumns="repeat(2, 1fr)"
                    gap={6}
                    position="relative"
                  >
                    {popularDishes.map((dish, index) => (
                      <MotionBox
                        key={dish.name}
                        gridColumn={index === 2 ? "span 2" : "auto"}
                        variants={smoothReveal}
                        custom={index}
                      >
                        <MotionBox
                          position="relative"
                          rounded="2xl"
                          overflow="hidden"
                          shadow="2xl"
                          variants={smoothScale}
                          whileHover="hover"
                          whileTap="tap"
                          initial={{ rotate: index % 2 ? 3 : -3 }}
                          animate={{ rotate: 0 }}
                          transition={smoothTransition}
                        >
                          <Image
                            src={dish.image}
                            alt={dish.name}
                            w="full"
                            h={{ base: "200px", md: "300px" }}
                            objectFit="cover"
                          />
                          <MotionBox
                            position="absolute"
                            bottom={0}
                            left={0}
                            right={0}
                            bg="blackAlpha.700"
                            p={4}
                            backdropFilter="blur(8px)"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.2,
                              ...smoothTransition
                            }}
                          >
                            <HStack justify="space-between">
                              <VStack align="start" spacing={1}>
                                <Text color="white" fontWeight="bold" fontSize="lg">
                                  {dish.name}
                                </Text>
                                <Badge colorScheme="brand" fontSize="sm">
                                  {dish.category}
                                </Badge>
                              </VStack>
                              <Text color="white" fontWeight="bold">
                                {dish.price}
                              </Text>
                            </HStack>
                          </MotionBox>
                        </MotionBox>
                      </MotionBox>
                    ))}
                  </Grid>

                  {/* Smooth decorative elements */}
                  <MotionBox
                    position="absolute"
                    top="-10%"
                    right="-5%"
                    w="300px"
                    h="300px"
                    bg="brand.50"
                    rounded="full"
                    filter="blur(60px)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.4, 0.2],
                      scale: [0.8, 1, 0.9]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                  <MotionBox
                    position="absolute"
                    bottom="-10%"
                    left="-5%"
                    w="300px"
                    h="300px"
                    bg="purple.50"
                    rounded="full"
                    filter="blur(60px)"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.4, 0.2],
                      scale: [0.8, 1, 0.9]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />
                </MotionBox>
              </MotionStack>
            </Container>
          </Box>
        </MotionBox>
      </AnimatePresence>

      {/* Features Section with Modern Cards */}
      <Box py={24} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <MotionHeading
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, brand.400, purple.500, blue.500)"
                bgClip="text"
                variants={smoothFadeInUp}
                initial="initial"
                animate="animate"
              >
                Why Choose Our Service?
              </MotionHeading>
              <Text color={textColor} fontSize="lg" maxW="2xl">
                Experience the best food delivery service with premium features designed for your convenience
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} width="full">
              {features.map((feature, index) => (
                <MotionBox
                  key={feature.title}
                  variants={smoothFadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{
                    ...smoothTransition,
                    delay: index * 0.1
                  }}
                >
                  <Box
                    p={8}
                    bg={cardBg}
                    borderRadius="2xl"
                    boxShadow="xl"
                    position="relative"
                    overflow="hidden"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      bgGradient: feature.gradient,
                    }}
                    _hover={{
                      transform: 'translateY(-8px)',
                      boxShadow: '2xl',
                    }}
                    transition="all 0.3s"
                  >
                    <VStack spacing={4} align="flex-start">
                      <Box
                        p={3}
                        borderRadius="xl"
                        bgGradient={feature.gradient}
                      >
                        <Icon as={feature.icon} w={6} h={6} color="white" />
                      </Box>
                      <Text fontSize="xl" fontWeight="bold">
                        {feature.title}
                      </Text>
                      <Text color={textColor}>
                        {feature.text}
                      </Text>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Popular Dishes Section */}
      <Box py={24} position="relative" overflow="hidden">
        <Container maxW="7xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <MotionHeading
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, brand.400, purple.500, blue.500)"
                bgClip="text"
                variants={smoothFadeInUp}
                initial="initial"
                animate="animate"
              >
                Most Popular Dishes
              </MotionHeading>
              <Text color={textColor} fontSize="lg" maxW="2xl">
                Discover our customer favorites, crafted with love and served with excellence
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} width="full">
              {popularDishes.map((dish, index) => (
                <MotionBox
                  key={dish.name}
                  variants={smoothFadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{
                    ...smoothTransition,
                    delay: index * 0.1
                  }}
                >
                  <Box
                    bg={glassBg}
                    borderRadius="2xl"
                    overflow="hidden"
                    boxShadow="xl"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor={useColorModeValue('gray.100', 'gray.700')}
                    _hover={{
                      transform: 'translateY(-8px)',
                      boxShadow: '2xl',
                    }}
                    transition="all 0.3s"
                  >
                    <Box position="relative">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        height={250}
                        width="100%"
                        objectFit="cover"
                      />
                      <Box
                        position="absolute"
                        top={4}
                        right={4}
                        bg={glassBg}
                        borderRadius="full"
                        px={3}
                        py={1}
                        backdropFilter="blur(8px)"
                      >
                        <HStack spacing={1}>
                          <Icon as={FaStar} color="yellow.400" />
                          <Text fontWeight="bold">{dish.rating}</Text>
                        </HStack>
                      </Box>
                    </Box>
                    <VStack p={6} align="stretch" spacing={4}>
                      <HStack justify="space-between">
                        <VStack align="start" spacing={1}>
                          <Text fontSize="xl" fontWeight="bold">
                            {dish.name}
                          </Text>
                          <Badge
                            colorScheme="brand"
                            px={2}
                            py={1}
                            borderRadius="full"
                          >
                            {dish.category}
                          </Badge>
                        </VStack>
                        <Text
                          fontSize="2xl"
                          fontWeight="bold"
                          bgGradient="linear(to-r, brand.400, purple.500)"
                          bgClip="text"
                        >
                          {dish.price}
                        </Text>
                      </HStack>
                      <Button
                        variant="outline"
                        colorScheme="brand"
                        size="lg"
                        width="full"
                        _hover={{
                          bgGradient: "linear(to-r, brand.400, purple.500)",
                          color: "white",
                        }}
                      >
                        Order Now
                      </Button>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box py={24} bg={sectionBg}>
        <Container maxW="7xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <MotionHeading
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                bgGradient="linear(to-r, brand.400, purple.500, blue.500)"
                bgClip="text"
                variants={smoothFadeInUp}
                initial="initial"
                animate="animate"
              >
                What Our Customers Say
              </MotionHeading>
              <Text color={textColor} fontSize="lg" maxW="2xl">
                Real feedback from our satisfied customers who love our service
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} width="full">
              {testimonials.map((testimonial, index) => (
                <MotionBox
                  key={testimonial.name}
                  variants={smoothFadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{
                    ...smoothTransition,
                    delay: index * 0.1
                  }}
                >
                  <Box
                    p={8}
                    bg={cardBg}
                    borderRadius="2xl"
                    boxShadow="xl"
                    position="relative"
                    _hover={{
                      transform: 'translateY(-8px)',
                      boxShadow: '2xl',
                    }}
                    transition="all 0.3s"
                  >
                    <VStack spacing={6}>
                      <Box
                        position="relative"
                        width="100px"
                        height="100px"
                        borderRadius="full"
                        overflow="hidden"
                        boxShadow="lg"
                        _before={{
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 'full',
                          padding: '2px',
                          bgGradient: 'linear(to-r, brand.400, purple.500)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                        }}
                      >
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                        />
                      </Box>
                      <VStack spacing={2}>
                        <Text fontSize="xl" fontWeight="bold">
                          {testimonial.name}
                        </Text>
                        <Text fontSize="sm" color={textColor}>
                          {testimonial.role}
                        </Text>
                        <HStack spacing={1}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Icon key={i} as={FaStar} color="yellow.400" />
                          ))}
                        </HStack>
                      </VStack>
                      <Text
                        color={textColor}
                        textAlign="center"
                        fontSize="md"
                        fontStyle="italic"
                      >
                        "{testimonial.text}"
                      </Text>
                    </VStack>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box py={24}>
        <Container maxW="7xl">
          <MotionBox
            variants={smoothFadeInUp}
            initial="initial"
            animate="animate"
            transition={smoothTransition}
            borderRadius="3xl"
            overflow="hidden"
            position="relative"
          >
            <Box
              p={16}
              bgGradient="linear(to-r, brand.400, purple.500, blue.500)"
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgGradient: 'radial(circle at top right, whiteAlpha.200, transparent 70%)',
              }}
            >
              <VStack spacing={8} color="white" textAlign="center">
                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                  Ready to Experience Amazing Food?
                </Heading>
                <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="2xl" opacity={0.9}>
                  Join thousands of satisfied customers and discover a world of delicious possibilities.
                </Text>
                <HStack spacing={4}>
                  <MotionButton
                    size="lg"
                    bg="white"
                    color="brand.500"
                    px={8}
                    fontSize="lg"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    rightIcon={<Icon as={FaArrowRight} />}
                    onClick={() => navigate('/menu')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Menu
                  </MotionButton>
                  <Button
                    size="lg"
                    variant="outline"
                    color="white"
                    px={8}
                    fontSize="lg"
                    _hover={{
                      bg: 'whiteAlpha.200',
                      transform: 'translateY(-2px)',
                    }}
                    onClick={() => navigate('/contact')}
                  >
                    Contact Us
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}