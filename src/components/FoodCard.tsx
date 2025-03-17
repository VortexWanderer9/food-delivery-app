import {
  Box,
  Image,
  Text,
  Stack,
  Badge,
  useColorModeValue,
  Button,
  HStack,
  IconButton,
  VStack,
  Tooltip,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingCart, FaClock, FaFire, FaLeaf, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cartSlice';

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);
const MotionButton = motion(Button);

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  preparationTime: number;
  restaurant: string;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isBestSeller?: boolean;
}

export default function FoodCard({
  id,
  name,
  description,
  price,
  image,
  category,
  rating,
  preparationTime,
  restaurant,
  isSpicy,
  isVegetarian,
  isBestSeller,
}: FoodCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({
      id,
      name,
      price,
      quantity: 1,
      image,
    }));
  };

  return (
    <MotionBox
      maxW="sm"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg={useColorModeValue('white', 'gray.800')}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      position="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      shadow="md"
      _hover={{ shadow: 'xl' }}
    >
      <Box position="relative" overflow="hidden">
        <Image
          src={image}
          alt={name}
          height="200px"
          width="100%"
          objectFit="cover"
          transition="transform 0.3s ease"
          transform={isHovered ? 'scale(1.1)' : 'scale(1)'}
        />
        <MotionIconButton
          aria-label={isLiked ? 'Unlike' : 'Like'}
          icon={isLiked ? <FaHeart /> : <FaRegHeart />}
          position="absolute"
          top={2}
          right={2}
          colorScheme={isLiked ? 'red' : 'gray'}
          variant="solid"
          size="sm"
          onClick={() => setIsLiked(!isLiked)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          bg={useColorModeValue('white', 'gray.700')}
          color={isLiked ? 'red.500' : 'gray.500'}
          opacity={0.9}
          _hover={{ opacity: 1 }}
        />
        <HStack
          position="absolute"
          top={2}
          left={2}
          spacing={2}
        >
          <Badge
            colorScheme="green"
            variant="solid"
            px={2}
            py={1}
            borderRadius="full"
            fontSize="xs"
          >
            {category}
          </Badge>
          {isBestSeller && (
            <Badge
              colorScheme="yellow"
              variant="solid"
              px={2}
              py={1}
              borderRadius="full"
              fontSize="xs"
            >
              <HStack spacing={1}>
                <FaStar />
                <Text>Best Seller</Text>
              </HStack>
            </Badge>
          )}
        </HStack>
      </Box>

      <Box p={4}>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1}>
              <Text
                fontWeight="bold"
                fontSize="xl"
                lineHeight="tight"
                isTruncated
              >
                {name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {restaurant}
              </Text>
            </VStack>
            <Text
              color={useColorModeValue('brand.500', 'brand.300')}
              fontWeight="bold"
              fontSize="xl"
            >
              ${price.toFixed(2)}
            </Text>
          </HStack>

          <Text
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize="sm"
            noOfLines={2}
          >
            {description}
          </Text>

          <HStack spacing={2} wrap="wrap">
            <Tooltip label="Rating" placement="top">
              <Badge colorScheme="orange" variant="subtle">
                <HStack spacing={1}>
                  <FaStar />
                  <Text>{rating.toFixed(1)}</Text>
                </HStack>
              </Badge>
            </Tooltip>
            <Tooltip label="Preparation Time" placement="top">
              <Badge colorScheme="blue" variant="subtle">
                <HStack spacing={1}>
                  <FaClock />
                  <Text>{preparationTime}min</Text>
                </HStack>
              </Badge>
            </Tooltip>
            {isSpicy && (
              <Tooltip label="Spicy" placement="top">
                <Badge colorScheme="red" variant="subtle">
                  <HStack spacing={1}>
                    <FaFire />
                    <Text>Spicy</Text>
                  </HStack>
                </Badge>
              </Tooltip>
            )}
            {isVegetarian && (
              <Tooltip label="Vegetarian" placement="top">
                <Badge colorScheme="green" variant="subtle">
                  <HStack spacing={1}>
                    <FaLeaf />
                    <Text>Veg</Text>
                  </HStack>
                </Badge>
              </Tooltip>
            )}
          </HStack>

          <MotionButton
            leftIcon={<FaShoppingCart />}
            colorScheme="brand"
            variant="solid"
            onClick={handleAddToCart}
            w="100%"
            mt={2}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart
          </MotionButton>
        </VStack>
      </Box>
    </MotionBox>
  );
} 