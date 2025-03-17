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
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaClock,
  FaHeadset,
  FaCheckCircle,
  FaQuestionCircle,
  FaComments,
  FaWhatsapp,
} from 'react-icons/fa';
import { useState } from 'react';

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const contactInfo = [
  {
    title: 'Phone',
    value: '+1 (555) 123-4567',
    icon: FaPhone,
    link: 'tel:+15551234567',
    color: 'blue.500',
  },
  {
    title: 'Email',
    value: 'contact@FoodieHub.com',
    icon: FaEnvelope,
    link: 'mailto:contact@FoodieHub.com',
    color: 'green.500',
  },
  {
    title: 'Address',
    value: '123 Food Street, Cuisine City, FC 12345',
    icon: FaMapMarkerAlt,
    color: 'red.500',
  },
  {
    title: 'Business Hours',
    value: 'Mon - Fri: 9:00 AM - 10:00 PM',
    icon: FaClock,
    color: 'purple.500',
  },
];

const faqItems = [
  {
    question: 'What are your delivery areas?',
    answer: 'We currently deliver to all areas within a 10-mile radius of our restaurant. You can check if your address is within our delivery zone by entering your postal code on our website.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Our average delivery time is 30-45 minutes. We ensure your food arrives hot and fresh, and we provide real-time tracking of your order through our app or website.',
  },
  {
    question: 'Do you offer catering services?',
    answer: 'Yes, we offer catering services for events of all sizes. Our catering menu includes a variety of options, and we can customize orders based on your specific needs.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and digital payment methods including PayPal, Apple Pay, and Google Pay. We also offer cash on delivery.',
  },
];

const supportChannels = [
  {
    title: 'Live Chat',
    description: 'Get instant support from our customer service team',
    icon: FaComments,
    color: 'blue.500',
  },
  {
    title: 'Phone Support',
    description: 'Call us for immediate assistance',
    icon: FaPhone,
    color: 'green.500',
  },
  {
    title: 'WhatsApp',
    description: 'Message us on WhatsApp for quick responses',
    icon: FaWhatsapp,
    color: 'green.500',
  },
  {
    title: 'Email Support',
    description: 'Send us an email for detailed inquiries',
    icon: FaEnvelope,
    color: 'purple.500',
  },
];

export default function Contact() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
              Contact Us
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={textColor}
              maxW="2xl"
              mx="auto"
            >
              Have questions or feedback? We'd love to hear from you!
            </Text>
          </MotionBox>

          {/* Contact Information Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
            {contactInfo.map((info, index) => (
              <MotionBox
                key={info.title}
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
                  <Icon as={info.icon} boxSize={8} color={info.color} />
                  <Text fontWeight="bold" fontSize="lg">
                    {info.title}
                  </Text>
                  {info.link ? (
                    <ChakraLink
                      href={info.link}
                      color={textColor}
                      _hover={{ color: info.color }}
                    >
                      {info.value}
                    </ChakraLink>
                  ) : (
                    <Text color={textColor}>{info.value}</Text>
                  )}
                </VStack>
              </MotionBox>
            ))}
          </SimpleGrid>

          {/* Support Channels */}
          <Box w="full">
            <Heading
              textAlign="center"
              mb={8}
              size="lg"
              bgGradient="linear(to-r, brand.400, purple.400)"
              bgClip="text"
            >
              How Can We Help You?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {supportChannels.map((channel, index) => (
                <MotionBox
                  key={channel.title}
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
                    <Icon as={channel.icon} boxSize={8} color={channel.color} />
                    <Text fontWeight="bold" fontSize="lg">
                      {channel.title}
                    </Text>
                    <Text color={textColor}>
                      {channel.description}
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Box>

          {/* Contact Form Section */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
            {/* Contact Form */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              p={8}
              bg={bgColor}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      _focus={{ borderColor: 'brand.500' }}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      _focus={{ borderColor: 'brand.500' }}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.phone}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      _focus={{ borderColor: 'brand.500' }}
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.subject}>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      _focus={{ borderColor: 'brand.500' }}
                    />
                    <FormErrorMessage>{errors.subject}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.message}>
                    <FormLabel>Message</FormLabel>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={4}
                      _focus={{ borderColor: 'brand.500' }}
                    />
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="brand"
                    size="lg"
                    w="full"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg'
                    }}
                  >
                    Send Message
                  </Button>
                </VStack>
              </form>
            </MotionBox>

            {/* Map and Social Links */}
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              p={8}
              bg={bgColor}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
            >
              <VStack spacing={8} align="stretch">
                {/* Map */}
                <Box
                  height="300px"
                  borderRadius="xl"
                  overflow="hidden"
                  position="relative"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Map"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                </Box>

                <Divider />

                {/* Social Links */}
                <VStack spacing={4} align="start">
                  <Text fontWeight="bold" fontSize="lg">
                    Follow Us
                  </Text>
                  <HStack spacing={4}>
                    <IconButton
                      as="a"
                      href="https://facebook.com/FoodieHub"
                      target="_blank"
                      aria-label="Facebook"
                      icon={<FaFacebook />}
                      colorScheme="facebook"
                      variant="ghost"
                      fontSize="20px"
                      _hover={{ transform: 'translateY(-2px)' }}
                    />
                    <IconButton
                      as="a"
                      href="https://instagram.com/FoodieHub"
                      target="_blank"
                      aria-label="Instagram"
                      icon={<FaInstagram />}
                      colorScheme="pink"
                      variant="ghost"
                      fontSize="20px"
                      _hover={{ transform: 'translateY(-2px)' }}
                    />
                    <IconButton
                      as="a"
                      href="https://twitter.com/FoodieHub"
                      target="_blank"
                      aria-label="Twitter"
                      icon={<FaTwitter />}
                      colorScheme="twitter"
                      variant="ghost"
                      fontSize="20px"
                      _hover={{ transform: 'translateY(-2px)' }}
                    />
                  </HStack>
                </VStack>

                <Divider />

                {/* Customer Support */}
                <VStack spacing={4} align="start">
                  <HStack spacing={3}>
                    <Icon as={FaHeadset} color="brand.500" boxSize={6} />
                    <Text fontWeight="bold" fontSize="lg">
                      Customer Support
                    </Text>
                  </HStack>
                  <Text color={textColor}>
                    Our support team is available 24/7 to help you with any questions or concerns.
                  </Text>
                  <Button
                    leftIcon={<Icon as={FaPhone} />}
                    colorScheme="brand"
                    variant="outline"
                    w="full"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg'
                    }}
                  >
                    Call Support
                  </Button>
                </VStack>
              </VStack>
            </MotionBox>
          </SimpleGrid>

          {/* FAQ Section */}
          <Box w="full">
            <Heading
              textAlign="center"
              mb={8}
              size="lg"
              bgGradient="linear(to-r, purple.400, blue.400)"
              bgClip="text"
            >
              Frequently Asked Questions
            </Heading>
            <Accordion allowMultiple>
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} border="none" mb={4}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <AccordionButton
                      bg={bgColor}
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor={borderColor}
                      _hover={{ bg: 'gray.50' }}
                    >
                      <Box flex="1" textAlign="left">
                        <Text fontWeight="bold">{faq.question}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel
                      bg={bgColor}
                      borderRadius="xl"
                      borderWidth="1px"
                      borderColor={borderColor}
                      mt={2}
                    >
                      <Text color={textColor}>{faq.answer}</Text>
                    </AccordionPanel>
                  </MotionBox>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>

          {/* Why Choose Us Section */}
          <Box w="full">
            <Heading
              textAlign="center"
              mb={8}
              size="lg"
              bgGradient="linear(to-r, brand.400, purple.400)"
              bgClip="text"
            >
              Why Choose Our Support?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <MotionBox
                p={6}
                bg={bgColor}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              >
                <VStack spacing={4} align="start">
                  <Icon as={FaHeadset} boxSize={8} color="brand.500" />
                  <Text fontWeight="bold" fontSize="lg">
                    Expert Support Team
                  </Text>
                  <Text color={textColor}>
                    Our dedicated support team is trained to handle all your queries efficiently.
                  </Text>
                </VStack>
              </MotionBox>

              <MotionBox
                p={6}
                bg={bgColor}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              >
                <VStack spacing={4} align="start">
                  <Icon as={FaHeadset} boxSize={8} color="brand.500" />
                  <Text fontWeight="bold" fontSize="lg">
                    Multiple Channels
                  </Text>
                  <Text color={textColor}>
                    Contact us through phone, email, live chat, or social media.
                  </Text>
                </VStack>
              </MotionBox>

              <MotionBox
                p={6}
                bg={bgColor}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
              >
                <VStack spacing={4} align="start">
                  <Icon as={FaClock} boxSize={8} color="brand.500" />
                  <Text fontWeight="bold" fontSize="lg">
                    24/7 Availability
                  </Text>
                  <Text color={textColor}>
                    We're here to help you round the clock, every day of the week.
                  </Text>
                </VStack>
              </MotionBox>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 