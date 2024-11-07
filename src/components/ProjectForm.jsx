import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  Heading,
  useDisclosure
} from '@chakra-ui/react';
import axios from "axios";

const ProjectForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    client: '',
    description: '',
    equipmentDelivery: '',
    srNo: '',
    type: 'oversea',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/projects", formData);
      console.log(response.data); // Success message or data from server
      onOpen(); // Open success modal
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <Box bg="white" p={8} rounded="md" shadow="md" maxW="600px" mx="auto">
      <Heading as="h2" size="lg" mb={6}>Add New Project</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Project Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={formData.location} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Client</FormLabel>
            <Input name="client" value={formData.client} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Equipment Delivery</FormLabel>
            <Input name="equipmentDelivery" value={formData.equipmentDelivery} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Serial Number</FormLabel>
            <Input name="srNo" value={formData.srNo} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <Select name="type" value={formData.type} onChange={handleChange}>
              <option value="oversea">Oversea</option>
              <option value="nationW">Nation Wide</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ProjectForm;