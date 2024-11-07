import { Box, Flex, Button, Link, HStack, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md" color="white">Admin Dashboard</Heading>
        <HStack spacing={4}>
          <Button as={RouterLink} to="/dashboard" colorScheme="teal" variant="ghost">
            Dashboard
          </Button>
          <Button as={RouterLink} to="/projects" colorScheme="teal" variant="ghost">
            Projects
          </Button>
          <Button as={RouterLink} to="/blog" colorScheme="teal" variant="ghost">
            Blog
          </Button>
          <Button as={RouterLink} to="/contact" colorScheme="teal" variant="ghost">
            Contacts
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default AdminNavbar;