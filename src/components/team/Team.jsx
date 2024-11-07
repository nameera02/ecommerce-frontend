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
  Select,
} from "@chakra-ui/react";
import axios from "axios";

const ClientManagement = () => {
  const [teams, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    name: "",           // Product name
    model: "",          // Product model
    image: null,        // Image file
    aval: "",           // Availability (e.g., "In Stock", "Out of Stock", "Pre-Order")
    price: "",          // Product price
    detail: ""          // Product details
  });  const [editTeamId, setEditTeamId] = useState(null);

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
console.log(formData);

  // Fetch Teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/team");
        setTeam(response.data.teams);
        
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
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
    formDataToSend.append("email", formData.email);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("image", formData.image);  // Only append if image is uploaded

    try {
      await axios.post("http://localhost:3000/api/team", formDataToSend);
      setFormData({ name: "", image: null });
      onAddClose();
      // Refetch clients
      const response = await axios.get("http://localhost:3000/api/teams");
      setTeam(response.data.teams);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  // Handle Edit Client submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("image", formData.image);  // Only append if image is uploaded
    formDataToSend.append("aval", formData.aval);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("detail", formData.detail);

    try {
      await axios.put(`http://localhost:3000/api/team/${editTeamId}`, formDataToSend);
      setFormData({
        name: "",
        email: "",
        designation: "",
        image: null,                // Set image to null if you want to keep it empty for new upload
      });
      setEditTeamId(null);
      onEditClose();
      // Refetch products
      const response = await axios.get("http://localhost:3000/api/team");
      setTeam(response.data);
      console.log(response);
      
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (team) => {
    setEditTeamId(team._id);
    setFormData({
      name: team.name,
      email: team.email,
      designation: team.designation,
      image: null,                // Set image to null if you want to keep it empty for new upload
    });
    onEditOpen();
  };

  // Handle delete button click
  const handleDelete = async (teamId) => {
    try {
      await axios.delete(`http://localhost:3000/api/team/${teamId}`);
      setTeam(teams.filter((team) => team._id !== teamId));
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <Box p={5}>
      <Button colorScheme="teal" onClick={onAddOpen}>
        Add Team
      </Button>
      <Table mt={4}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Designation</Th>
            <Th>Email</Th>
            <Th>Image</Th>            
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {teams.map((team) => (
            <Tr key={team._id}>
              <Td>{team.name}</Td>
              <Td>
                <img src={`${team.imagePath}`} alt={team.name} width="50" />
              </Td>
              <Td>{team.email}</Td>
              <Td>{team.designation}</Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleEditClick(team)}>
                  Edit
                </Button>
                <Button colorScheme="red" ml={2} onClick={() => handleDelete(team._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add Team Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleAddSubmit}>
              <FormControl isRequired mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Designation</FormLabel>
                <Input type="text" name="designation" value={formData.designation} onChange={handleChange} />
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

      {/* Edit Product Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit Team</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <form onSubmit={handleEditSubmit}>
      <FormControl isRequired mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Designation</FormLabel>
                <Input type="text" name="designation" value={formData.designation} onChange={handleChange} />
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