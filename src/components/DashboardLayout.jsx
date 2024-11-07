import { Box } from '@chakra-ui/react';
import AdminNavbar from './AdminNavbar';

const DashboardLayout = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.100">
      <AdminNavbar />
      <Box p={8}>{children}</Box>
    </Box>
  );
};
export default DashboardLayout;