import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Icon,
  VStack,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  HStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram, FaArrowRight, FaHeart } from 'react-icons/fa';
import { ReactNode, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionStack = motion.create(Stack);
const MotionButton = motion.create(Button);
const MotionHeading = motion.create(Heading);
const MotionInputGroup = motion.create(InputGroup);
const MotionInput = motion.create(Input);

const inputVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  }
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      fontWeight={'600'}
      fontSize={'lg'}
      mb={3}
      bgGradient="linear(to-r, brand.400, purple.400)"
      bgClip="text"
    >
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('brand.50', 'whiteAlpha.100')}
      rounded={'full'}
      w={10}
      h={10}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'all 0.3s ease'}
      _hover={{
        bg: 'brand.500',
        color: 'white',
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const FooterLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link
    as={RouterLink}
    to={to}
    _hover={{
      textDecoration: 'none',
      color: 'brand.500',
      transform: 'translateX(5px)',
    }}
    transition="all 0.3s ease"
    display="inline-block"
  >
    {children}
  </Link>
);

export default function Footer() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      bg={bgColor}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto"
      initial={inputVariants.initial}
      animate={inputVariants.animate}
    >
      <Container as={Stack} maxW={'7xl'} py={16}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <MotionStack
            align={'flex-start'}
            initial={inputVariants.initial}
            animate={inputVariants.animate}
            transition={{ delay: 0.2 }}
          >
            <ListHeader>Company</ListHeader>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </MotionStack>

          <MotionStack
            align={'flex-start'}
            initial={inputVariants.initial}
            animate={inputVariants.animate}
            transition={{ delay: 0.3 }}
          >
            <ListHeader>Support</ListHeader>
            <FooterLink to="/help">Help Center</FooterLink>
            <FooterLink to="/safety">Safety Center</FooterLink>
            <FooterLink to="/community">Community Guidelines</FooterLink>
          </MotionStack>

          <MotionStack
            align={'flex-start'}
            initial={inputVariants.initial}
            animate={inputVariants.animate}
            transition={{ delay: 0.4 }}
          >
            <ListHeader>Legal</ListHeader>
            <FooterLink to="/cookies">Cookies Policy</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/legal">Law Enforcement</FooterLink>
          </MotionStack>

          <MotionStack
            align={'flex-start'}
            spacing={4}
            initial={inputVariants.initial}
            animate={inputVariants.animate}
            transition={{ delay: 0.5 }}
          >
            <ListHeader>Stay Updated</ListHeader>
            <Text fontSize="sm" color="gray.500">
              Subscribe to our newsletter for the latest updates and exclusive offers!
            </Text>
            <InputGroup size="md">
              <Input
                placeholder="Enter your email"
                bg={useColorModeValue('white', 'gray.800')}
                border="1px"
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                borderRadius="md"
                fontSize="md"
                height="40px"
                _hover={{
                  borderColor: useColorModeValue('gray.400', 'gray.500'),
                }}
                _focus={{
                  borderColor: 'brand.400',
                  boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
                }}
                _placeholder={{
                  color: useColorModeValue('gray.400', 'gray.500'),
                }}
              />
              <InputRightElement width="4.5rem" height="40px">
                <Button
                  h="32px"
                  size="sm"
                  colorScheme="brand"
                  bg="brand.400"
                  rightIcon={<Icon as={FaArrowRight} fontSize="12px" />}
                  _hover={{
                    bg: 'brand.500',
                  }}
                  _active={{
                    bg: 'brand.600',
                  }}
                >
                  Join
                </Button>
              </InputRightElement>
            </InputGroup>
            <Stack direction={'row'} spacing={6} mt={2}>
              <SocialButton label={'Twitter'} href={'https://twitter.com/fooddelivery'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'https://youtube.com/fooddelivery'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'https://instagram.com/fooddelivery'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </MotionStack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={borderColor}
      >
        <Container
          as={Stack}
          maxW={'7xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>
            © {new Date().getFullYear()} FoodieHub. Made <Icon as={FaHeart} color="red.500" />
          </Text>
          <Stack direction={'row'} spacing={6}>
            <Link as={RouterLink} to="/terms" color="gray.500" _hover={{ color: 'brand.500' }}>
              Terms
            </Link>
            <Link as={RouterLink} to="/privacy" color="gray.500" _hover={{ color: 'brand.500' }}>
              Privacy
            </Link>
            <Link as={RouterLink} to="/contact" color="gray.500" _hover={{ color: 'brand.500' }}>
              Contact
            </Link>
          </Stack>
        </Container>
      </Box>
    </MotionBox>
  );
} 