import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [editClientId, setEditClientId] = useState(null);

  // Disclosure hooks for separate modals
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clients");
        setClients(response.data.clients);
        console.log(response.data.clients);
        
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle Add Client submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);

    try {
      await axios.post("http://localhost:3000/api/client", formDataToSend);
      setFormData({ name: "", image: null });
      onAddClose();
      // Refetch clients
      const response = await axios.get("http://localhost:3000/api/clients");
      setClients(response.data.clients);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  // Handle Edit Client submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);

    try {
      await axios.put(`http://localhost:3000/api/client/${editClientId}`, formDataToSend);
      setFormData({ name: "", image: null });
      setEditClientId(null);
      onEditClose();
      // Refetch clients
      const response = await axios.get("http://localhost:3000/api/clients");
      setClients(response.data.clients);
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (client) => {
    setEditClientId(client._id);
    setFormData({ name: client.name, image: null });
    onEditOpen();
  };

  // Handle delete button click
  const handleDelete = async (clientId) => {
    try {
      await axios.delete(`http://localhost:3000/api/client/${clientId}`);
      setClients(clients.filter((client) => client._id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <Box p={5}>
      <Button colorScheme="teal" onClick={onAddOpen}>
        Add Client
      </Button>
      <Table mt={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map((client) => (
            <Tr key={client._id}>
              <Td>{client.name}</Td>
              <Td>
                <img src={`${client.imagePath}`} alt={client.name} width="50" />
              </Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleEditClick(client)}>
                  Edit
                </Button>
                <Button colorScheme="red" ml={2} onClick={() => handleDelete(client._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add Client Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleAddSubmit}>
              <FormControl isRequired mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Image</FormLabel>
                <Input type="file" name="image" onChange={handleChange} accept="image/*" />
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Add
                </Button>
                <Button onClick={onAddClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Client Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleEditSubmit}>
              <FormControl isRequired mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Image</FormLabel>
                <Input type="file" name="image" onChange={handleChange} accept="image/*" />
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Update
                </Button>
                <Button onClick={onEditClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ClientManagement;