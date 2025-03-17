import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  HStack,
  useColorMode,
  Badge,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { FaShoppingCart, FaUser, FaHeart } from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';

// Create motion components using the new syntax
const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Menu',
    href: '/menu',
  },
  {
    label: 'Categories',
    children: [
      {
        label: 'Pizza',
        subLabel: 'Italian style pizzas',
        href: '/category/pizza',
      },
      {
        label: 'Burgers',
        subLabel: 'Gourmet burgers',
        href: '/category/burgers',
      },
      {
        label: 'Sushi',
        subLabel: 'Fresh Japanese cuisine',
        href: '/category/sushi',
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box position="fixed" w="full" zIndex={1000}>
      <MotionFlex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        boxShadow="sm"
        backdropFilter="blur(10px)"
        backgroundColor={useColorModeValue('rgba(255, 255, 255, 0.9)', 'rgba(26, 32, 44, 0.9)')}
      >
        <Container maxW="7xl">
          <Flex align="center" justify="space-between" w="full">
            {/* Logo */}
            <RouterLink to="/">
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                fontSize="2xl"
                fontWeight="bold"
                bgGradient="linear(to-r, brand.400, purple.500)"
                bgClip="text"
                _hover={{
                  bgGradient: "linear(to-r, brand.500, purple.600)",
                }}
                transition="all 0.3s"
              >
                FoodieHub
              </Text>
            </RouterLink>

            {/* Desktop Navigation */}
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav currentPath={location.pathname} />
            </Flex>

            {/* Right Side Icons */}
            <HStack spacing={3}>
              {/* Color Mode Toggle */}
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                _hover={{
                  bg: useColorModeValue('brand.50', 'whiteAlpha.200'),
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              />

              {/* Favorites */}
              <IconButton
                as={RouterLink}
                to="/favorites"
                aria-label="Favorites"
                icon={<FaHeart />}
                variant="ghost"
                _hover={{
                  bg: useColorModeValue('brand.50', 'whiteAlpha.200'),
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              />

              {/* Cart */}
              <Box position="relative">
                <IconButton
                  as={RouterLink}
                  to="/cart"
                  aria-label="Shopping Cart"
                  icon={<FaShoppingCart />}
                  variant="ghost"
                  _hover={{
                    bg: useColorModeValue('brand.50', 'whiteAlpha.200'),
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                />
                {cartItemsCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    colorScheme="brand"
                    variant="solid"
                    fontSize="xs"
                    borderRadius="full"
                    minW="18px"
                    h="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    transform="scale(1)"
                    transition="transform 0.2s"
                    _hover={{ transform: 'scale(1.1)' }}
                  >
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </Badge>
                )}
              </Box>

              {/* Profile */}
              <IconButton
                as={RouterLink}
                to="/profile"
                aria-label="User Profile"
                icon={<FaUser />}
                variant="ghost"
                _hover={{
                  bg: useColorModeValue('brand.50', 'whiteAlpha.200'),
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              />

              {/* Mobile Menu Toggle */}
              <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onToggle}
                icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                variant="ghost"
                aria-label="Toggle Navigation"
                _hover={{
                  bg: useColorModeValue('brand.50', 'whiteAlpha.200'),
                }}
              />
            </HStack>
          </Flex>
        </Container>
      </MotionFlex>

      {/* Mobile Navigation */}
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ currentPath }: { currentPath: string }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('brand.500', 'brand.300');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                as={RouterLink}
                p={2}
                to={navItem.href ?? '#'}
                fontSize={'md'}
                fontWeight={500}
                color={currentPath === navItem.href ? 'brand.500' : linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
                position="relative"
                _after={currentPath === navItem.href ? {
                  content: '""',
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  height: '2px',
                  bg: 'brand.500',
                  borderRadius: 'full',
                } : undefined}
              >
                {navItem.label}
                {navItem.children && (
                  <Icon
                    as={ChevronDownIcon}
                    transition={'all .25s ease-in-out'}
                    w={6}
                    h={6}
                    ml={1}
                  />
                )}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={RouterLink}
      to={href ?? '#'}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('brand.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'brand.500' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: 1, transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'brand.500'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
      borderBottomRadius="xl"
      boxShadow="lg"
      spacing={4}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                as={RouterLink}
                to={child.href ?? '#'}
                py={2}
                color={useColorModeValue('gray.600', 'gray.200')}
                _hover={{
                  color: 'brand.500',
                }}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}; 