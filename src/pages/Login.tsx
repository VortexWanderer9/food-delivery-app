import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  HStack,
  Divider,
  Icon,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/authSlice';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

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

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    dispatch(loginStart());
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data
      const userData = {
        id: '1',
        email: formData.email,
        name: formData.email.split('@')[0], // Use part of email as name for demo
      };
      
      dispatch(loginSuccess(userData));
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/menu');
    } catch (error) {
      dispatch(loginFailure('Invalid credentials'));
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" pt="80px">
      <Container maxW="md">
        <MotionVStack
          spacing={8}
          align="stretch"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <VStack spacing={3} textAlign="center">
            <Heading
              fontSize={{ base: "3xl", md: "4xl" }}
              bgGradient="linear(to-r, brand.400, purple.400, blue.400)"
              bgClip="text"
            >
              Welcome Back
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.200')}>
              Sign in to continue to your account
            </Text>
          </VStack>

          {/* Social Login */}
          <MotionBox variants={itemVariant}>
            <VStack spacing={4}>
              <Button
                w="full"
                variant="outline"
                leftIcon={<Icon as={FaGoogle} />}
                onClick={() => {}}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'md',
                }}
              >
                Continue with Google
              </Button>
              <Button
                w="full"
                variant="outline"
                leftIcon={<Icon as={FaFacebook} />}
                onClick={() => {}}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'md',
                }}
              >
                Continue with Facebook
              </Button>
              <Button
                w="full"
                variant="outline"
                leftIcon={<Icon as={FaApple} />}
                onClick={() => {}}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'md',
                }}
              >
                Continue with Apple
              </Button>
            </VStack>
          </MotionBox>

          <HStack>
            <Divider />
            <Text fontSize="sm" whiteSpace="nowrap" color="gray.500">
              or continue with
            </Text>
            <Divider />
          </HStack>

          {/* Login Form */}
          <MotionBox
            variants={itemVariant}
            as="form"
            onSubmit={handleSubmit}
          >
            <VStack spacing={6}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    leftElement={<Icon as={FaEnvelope} color="gray.500" ml={3} />}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    leftElement={<Icon as={FaLock} color="gray.500" ml={3} />}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={<Icon as={showPassword ? FaEyeSlash : FaEye} />}
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                w="full"
                isLoading={loading}
                loadingText="Signing in..."
                bgGradient="linear(to-r, brand.500, purple.500)"
                _hover={{
                  bgGradient: "linear(to-r, brand.600, purple.600)",
                }}
              >
                Sign In
              </Button>
            </VStack>
          </MotionBox>

          {/* Footer */}
          <VStack spacing={4} pt={4}>
            <Button
              variant="link"
              colorScheme="brand"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </Button>
            <Text>
              Don't have an account?{' '}
              <Button
                as={RouterLink}
                to="/register"
                variant="link"
                colorScheme="brand"
              >
                Sign Up
              </Button>
            </Text>
          </VStack>
        </MotionVStack>
      </Container>
    </Box>
  );
} 