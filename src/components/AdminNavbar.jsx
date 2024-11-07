import { Box, Flex, Button, Link, HStack, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md" color="white">Admin Dashboard</Heading>
        <HStack spacing={4}>

          <Button as={RouterLink} to="/projects" colorScheme="teal" variant="ghost">
            Projects
          </Button>
          <Button as={RouterLink} to="/products" colorScheme="teal" variant="ghost">
            Products
          </Button>
          <Button as={RouterLink} to="/certificates" colorScheme="teal" variant="ghost">
          Certificate
          </Button>
          <Button as={RouterLink} to="/clients" colorScheme="teal" variant="ghost">
          Clients
          </Button>
          <Button as={RouterLink} to="/teams" colorScheme="teal" variant="ghost">
          Teams
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default AdminNavbar;