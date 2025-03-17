import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Flex,
  useColorModeValue,
  Button,
  HStack,
  Badge,
  Image,
  Divider,
  IconButton,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaUtensils,
  FaClock,
  FaTruck,
  FaStar,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const features = [
  { name: 'Fresh Ingredients', level: 'Premium' },
  { name: 'Fast Delivery', level: '30 mins' },
  { name: 'Quality Food', level: '5 Star' },
  { name: 'Wide Selection', level: '100+ Items' },
  { name: '24/7 Service', level: 'Always Open' },
  { name: 'Best Prices', level: 'Affordable' },
  { name: 'Hygienic', level: '100% Clean' },
  { name: 'Customer Support', level: '24/7' },
];

const highlights = [
  {
    title: 'Our Story',
    description: "Founded in 2020, we've been serving delicious meals with love and passion",
    icon: FaUtensils,
    color: 'brand.500',
  },
  {
    title: 'Fast Delivery',
    description: 'We ensure your food arrives hot and fresh within 30 minutes',
    icon: FaTruck,
    color: 'green.500',
  },
  {
    title: 'Quality Service',
    description: 'Our team is dedicated to providing the best dining experience',
    icon: FaClock,
    color: 'purple.500',
  },
];

// Enhanced image animation variants
const imageAnimationVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.95,
    filter: "blur(15px) brightness(0.8)"
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px) brightness(1)",
    transition: {
      duration: 1.2,
      ease: "easeOut"
    }
  }
};

export default function About() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We will get back to you soon.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box minH="100vh" py={20}>
      <Container maxW="7xl">
        <VStack spacing={16}>
          {/* Hero Section */}
          <MotionBox
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            textAlign="center"
          >
            <Heading
              fontSize={{ base: '4xl', md: '5xl' }}
              bgGradient="linear(to-r, brand.400, purple.400, blue.400)"
              bgClip="text"
              mb={4}
            >
              About Us
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={textColor}
              maxW="2xl"
              mx="auto"
            >
              Delivering happiness through delicious food, one order at a time.
            </Text>
          </MotionBox>

          {/* Restaurant Image Section */}
          <MotionFlex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            gap={{ base: 8, md: 12 }}
          >
            <MotionBox
              variants={imageAnimationVariants}
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="2xl"
              borderWidth="1px"
              borderColor={borderColor}
              width={{ base: "full", md: "500px" }}
              height={{ base: "400px", md: "600px" }}
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
                zIndex: 1,
                opacity: 0,
                transition: "opacity 0.5s ease-in-out"
              }}
              _hover={{
                "&:before": {
                  opacity: 1
                },
                transform: "scale(1.02) translateY(-4px)",
                boxShadow: "3xl",
                transition: "all 0.4s ease-in-out"
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Our Restaurant"
                objectFit="cover"
                width="100%"
                height="100%"
                filter="contrast(1.1) brightness(0.95) saturate(1.1)"
                transition="all 0.4s ease-in-out"
                _hover={{
                  filter: "contrast(1.15) brightness(1) saturate(1.2)"
                }}
                style={{
                  transformOrigin: "center"
                }}
              />
            </MotionBox>
            
            <VStack 
              align={{ base: "center", md: "start" }} 
              spacing={6}
              flex={1}
            >
              <Heading size="lg">Welcome to FoodieHub</Heading>
              <Text color={textColor} fontSize="lg" lineHeight="tall">
                At FoodieHub, we believe in delivering not just food, but an experience. 
                Our journey began with a simple mission: to provide delicious, fresh, and 
                high-quality food delivered right to your doorstep. With our extensive menu 
                and dedicated delivery team, we ensure that every order brings joy to our customers.
              </Text>
              <HStack spacing={4}>
                <Button
                  leftIcon={<Icon as={FaPhone} />}
                  colorScheme="brand"
                  size="lg"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg"
                  }}
                >
                  Call Us
                </Button>
                <Button
                  leftIcon={<Icon as={FaMapMarkerAlt} />}
                  colorScheme="yellow"
                  size="lg"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg"
                  }}
                >
                  Find Us
                </Button>
              </HStack>
            </VStack>
          </MotionFlex>

          {/* Features Section */}
          <Box w="full">
            <Heading
              textAlign="center"
              mb={8}
              size="lg"
              bgGradient="linear(to-r, brand.400, purple.400)"
              bgClip="text"
            >
              Why Choose Us
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              {features.map((feature, index) => (
                <MotionBox
                  key={feature.name}
                  p={4}
                  bg={bgColor}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={borderColor}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
                >
                  <VStack>
                    <Text fontWeight="bold">{feature.name}</Text>
                    <Badge colorScheme="brand">{feature.level}</Badge>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Box>

          {/* Highlights Section */}
          <Box w="full">
            <Heading
              textAlign="center"
              mb={8}
              size="lg"
              bgGradient="linear(to-r, purple.400, blue.400)"
              bgClip="text"
            >
              Our Highlights
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {highlights.map((highlight, index) => (
                <MotionBox
                  key={highlight.title}
                  p={6}
                  bg={bgColor}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={borderColor}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
                >
                  <VStack spacing={4} align="start">
                    <Icon as={highlight.icon} boxSize={8} color={highlight.color} />
                    <Text fontWeight="bold" fontSize="lg">
                      {highlight.title}
                    </Text>
                    <Text color={textColor}>
                      {highlight.description}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Box>

          {/* Contact Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            p={8}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            w="full"
          >
            <VStack spacing={6} align="stretch">
              <Heading size="lg" textAlign="center">
                Get in Touch
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <VStack spacing={3}>
                  <Icon as={FaPhone} boxSize={6} color="brand.500" />
                  <Text fontWeight="bold">Phone</Text>
                  <Text color={textColor}>+1 (555) 123-4567</Text>
                </VStack>
                <VStack spacing={3}>
                  <Icon as={FaMapMarkerAlt} boxSize={6} color="brand.500" />
                  <Text fontWeight="bold">Address</Text>
                  <Text color={textColor}>123 Food Street, Cuisine City, FC 12345</Text>
                </VStack>
                <VStack spacing={3}>
                  <Icon as={FaEnvelope} boxSize={6} color="brand.500" />
                  <Text fontWeight="bold">Email</Text>
                  <Text color={textColor}>contact@FoodieHub.com</Text>
                </VStack>
              </SimpleGrid>
              <HStack spacing={4} justify="center">
                <Button
                  as={RouterLink}
                  to="/contact"
                  colorScheme="brand"
                  size="lg"
                  leftIcon={<Icon as={FaPhone} />}
                >
                  Call Us
                </Button>
                <Button
                  as={RouterLink}
                  to="/contact"
                  colorScheme="brand"
                  variant="outline"
                  size="lg"
                  leftIcon={<Icon as={FaMapMarkerAlt} />}
                >
                  Find Us
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
} 